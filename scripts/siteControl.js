window.comments = new controlComments();

window.comments._databaseGet.on("value", function (snapshot) {
    let cardsDisplay = '';
    snapshot.forEach(function (childSnapshot) {
        let key = childSnapshot.key;
        let childData = childSnapshot.val();

        childData['key'] = key;

        cardsDisplay += 
            `<div class="col-sm-6 col-md-4">
              <div class="card mb-5">
                  <img class="card-img-top" src="${childData.foto}">
                  <div class="card-body">
                      <h4 class="card-title">${childData.nome}</h4>
                      <h6 class="card-subtitle mb-2 text-muted">${childData.nome}</h6>
                      <p class="card-text">${childData.comentario}
                      </p>
                      <button type="button" onclick=" window.comments.deletar('${childData.key}','${childData.imgref}')" class="btn">Deletar</button>
                  </div>
              </div>
              </div>`;
    });

    window.comments.addComentsDisplay(cardsDisplay);
}, function (error) {
   console.log('erro de requerimento');
});
