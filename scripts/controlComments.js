
class controlComments {

  constructor() {
    let config = {
      apiKey: "AIzaSyCL70KIMzQraKdmGWevmSfGXodawhUur4k",
      authDomain: "portifolio-1.firebaseapp.com",
      databaseURL: "https://portifolio-1.firebaseio.com",
      projectId: "portifolio-1",
      storageBucket: "portifolio-1.appspot.com",
      messagingSenderId: "453946984196"
    };
    firebase.initializeApp(config);
    this._database = firebase.database();
    this._databaseSet = firebase.database().ref('Coments/');
    this._databaseGet = firebase.database().ref('Coments/').orderByKey();
    this._storageRef = firebase.storage().ref();
  }

  addComentsDisplay(cardsDisplay) {
    document.getElementById('cards').innerHTML = cardsDisplay;
  }

  deletar(key, imgref) {

    console.log(key, imgref);

    let _this = this;

    let desertRef = this._storageRef.child(imgref);

    desertRef.delete().then(function () {

      _this._database.ref('Coments/' + key).remove();

    }).catch(function (error) {

    });

  }

  addComents() {
    event.preventDefault();

    let _this = this;
    let check = true;

    let fields = document.querySelectorAll("#form-user-create [name]");
    let user = {};
    fields.forEach(function (field) {

      if (field.checkValidity()) {
        user[field.name] = field.value;
      } else {
        check = false;
      }

    });

    if (check) {

      let file = this._file;

      let metadata = {
        contentType: 'image/jpeg'
      };

      let uploadTask = this._storageRef.child('images/' + file.name).put(file, metadata);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {

          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById('progress').style.width = progress + '%';

          document.getElementById('progress').innerHTML = progress + '%';
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {

          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function () {

          user['imgref'] = 'images/' + file.name;

          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            user.foto = downloadURL;
            _this._databaseSet.push(user);
            document.getElementById("form-user-create").reset();
            document.getElementById('progress').style.width = '0%';
            document.getElementById('progress').innerHTML = '0%';

          });
        });

    }
  }

  getFile(e) {
    this._file = e.target.files[0];
  }

}





