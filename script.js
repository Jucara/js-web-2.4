// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/
import axios from 'axios';
import {markdown} from 'markdown';


const getchara = async()=>{
  let response = await axios.get("https://character-database.becode.xyz/characters")

    console.log(response.data);
    for (let i=0; i < response.data.length;i++){
      let crdiv = document.createElement('div');
      crdiv.className = "modal fade";
      crdiv.id="perso" + i;
      let pmod=document.createElement("p");
      let name1 = document.createElement("p");
      let crimg =document.createElement("img");
      let text = document.createTextNode(response.data[i].name);
      name1.appendChild(text);
      crimg.setAttribute("src","data:image/jpeg;base64," + response.data[i].image);
      let descri = document.createElement("p");
      let text1 = document.createTextNode(response.data[i].shortDescription);
      let btn = document.createElement("BUTTON");
      let tbtn = document.createTextNode("Description");
      btn.dataset.target = "#perso" + i;
      btn.dataset.toggle="modal";
      crdiv.innerHTML= modalinvok;
      descri.appendChild(text1);
      pmod.appendChild(crdiv)
      pmod.appendChild(name1);
      pmod.appendChild(crimg);
      pmod.appendChild(descri);
      btn.appendChild(tbtn);
      pmod.appendChild(btn);
      let modalbody =pmod.querySelector(".modal-body");
      modalbody.innerHTML=markdown.toHTML(response.data[i].description);

      document.querySelector(".chara").appendChild(pmod);
    }

}
window.onload = function (){getchara()};

document.querySelector(".bsave").addEventListener("click", async function(){
  let postname=document.querySelector("#name").value;
  let postshortDescription=document.querySelector("#shortdes").value;
  let postdescription=document.querySelector("#des").value
  console.log({
    name : postname,
    shortDescription : postshortDescription,
    description: postdescription
  });
  let insert = await axios.post("https://character-database.becode.xyz/characters",{
    name : postname,
    shortDescription : postshortDescription,
    description: postdescription,
    
  })
})




const modalinvok = `<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">character</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  <button type="button" class="btn btn-primary">Save changes</button>
</div>
</div>
</div>`
