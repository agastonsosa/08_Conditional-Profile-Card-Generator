import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  let socialMediaIcons = "";
  if (
    variables.twitter !== undefined ||
    variables.github !== undefined ||
    variables.linkedin !== undefined ||
    variables.instagram !== undefined
  ) {
    socialMediaIcons = `
      <ul class=${variables.socialMediaPosition}>
        ${
          variables.twitter !== undefined
            ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
            : ""
        }
        ${
          variables.github !== undefined
            ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
            : ""
        }
        ${
          variables.linkedin !== undefined
            ? `<li><a href="https://linkedin.com/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
            : ""
        }
        ${
          variables.instagram !== undefined
            ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
            : ""
        }
      </ul>`;
  }

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
    ${cover}
    <img src="${variables.avatarURL}" class="photo" />
    <h1 class="name-font">${variables.name} ${variables.lastname}</h1>
    <h2 class="role-font">${variables.role}</h2>
    <h3 class="city-font">${variables.city} ${variables.country}</h3>
    ${socialMediaIcons}
  </div>`;
}

window.onload = function() {
  window.variables = {
    includeCover: true,
    background:
      "https://www.impacthrg.com.au/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbk1HIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0725fc0328bc750a0fcc18a18ffde9bcca5b8dff/img-placeholder.jpg",
    avatarURL:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
    socialMediaPosition: "position-left",
    twitter: "",
    github: "",
    linkedin: "",
    instagram: "",
    name: "",
    lastname: "",
    role: "",
    country: "",
    city: ""
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      const attribute = e.target.getAttribute("for");
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? ""
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values));
    });
  });
};
const coverImageInput = document.getElementById("coverImageInput");
coverImageInput.addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      // Set the background image of the cover div
      window.variables.background = event.target.result;
      render(window.variables);
    };
    reader.readAsDataURL(file);
  }
});
