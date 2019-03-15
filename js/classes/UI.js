class UI {
  static showAlert(type, title, message) {

    let alert = `<div class="ui ${type} message">
  <i class="close icon"></i>
  <div class="header">
    ${title}
  </div>
  <p>${message}</p>
</div>`;

    $(".alerts").html(alert);

    setTimeout(() => {

      $(".alerts").html(''); //erase

    }, 5000);


  }
}
