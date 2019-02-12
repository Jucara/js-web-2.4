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
      let crdiv2=document.createElement('div');
      crdiv2.className="modal fade";
      crdiv2.id="chara" + i;
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
      let btn2 = document.createElement("BUTTON");
      let tbtn2 = document.createTextNode("Edit");
      let btn3 = document.createElement("BUTTON");
      let tbtn3=document.createTextNode("Delete");
      btn3.className="deletebtn";
      btn.dataset.target = "#perso" + i;
      btn.dataset.toggle="modal";
      btn2.dataset.target = "#chara" + i;
      btn2.dataset.toggle="modal";
      crdiv.innerHTML= modalinvok;
      crdiv2.innerHTML=modalinvok2;
      descri.appendChild(text1);
      pmod.appendChild(crdiv)
      pmod.appendChild(crdiv2);
      pmod.appendChild(name1);
      pmod.appendChild(crimg);
      pmod.appendChild(descri);
      btn.appendChild(tbtn);
      pmod.appendChild(btn);
      btn2.appendChild(tbtn2);
      pmod.appendChild(btn2);
      btn3.appendChild(tbtn3);
      pmod.appendChild(btn3);
      let modalbody =pmod.querySelector(".modal-body");
      modalbody.innerHTML=markdown.toHTML(response.data[i].description);
      pmod.querySelector('#files').addEventListener('change',handleFileSelect,false)
      let editname =pmod.querySelector(".namedit")
      let editshortDesciption =pmod.querySelector(".shortDescriptionedit")
      let editdescription =pmod.querySelector(".descriptionedit")
      editname.value=response.data[i].name;
      editshortDesciption.value=response.data[i].shortDescription
      editdescription.value=response.data[i].description

      document.querySelector(".chara").appendChild(pmod);
    }
    let alex=document.querySelectorAll(".btnedit");
    for (let i=0; i<alex.length;i++){
      alex[i].addEventListener("click", async function(event){
        let joe = event.target.closest(".modal-content").querySelector(".modal-body2");

        //let img= document.createElement('img');
        //img.setAttribute('src',"data:image/jpeg;base64,")
        let img = document.querySelector(".thumb")
        console.log(img);
        let img_data = img.src
        img_data =img_data.substring(22);
        console.log(response.data[i].id);
        console.log({
          name : joe.querySelector(".namedit").value,
          shortDescription: joe.querySelector(".shortDescriptionedit").value,
          description : joe.querySelector(".descriptionedit").value,
          image: "",
        });
        axios.put('https://character-database.becode.xyz/characters/'+response.data[i].id,{
          name : joe.querySelector(".namedit").value,
          shortDescription: joe.querySelector(".shortDescriptionedit").value,
          description : joe.querySelector(".descriptionedit").value,
          image: img_data,
        })
      })
    }
  let deletefrere =  document.querySelectorAll(".deletebtn")
  for (let i=0;i<deletefrere.length;i++){
    deletefrere[i].addEventListener("click",async(event)=>{
      let deletechara=window.confirm("Hééééyy gros t'es suuuuuuuur ?")
      if(deletechara){
        await axios.delete('https://character-database.becode.xyz/characters/'+response.data[i].id);
        window.location.reload(true);
      }
    })
  }
}
window.onload = function (){getchara()};

document.querySelector(".bsave").addEventListener("click", async function(){
  let img=document.querySelector(".thumb");
  let img_data=img.src;
  img_data=img_data.substring(22);
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
    image : img_data,
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
const modalinvok2 = `<div class="modal-dialog" role="document">
<div class="modal-content">
<div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Edit character</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body2">
<input type="file" id="files"/>
<outpout id="list"></output>
<textarea class="namedit"></textarea>
<textarea class="shortDescriptionedit"></textarea>
<textarea class="descriptionedit"></textarea>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  <button type="button" class="btnedit">Save changes</button>
</div>
</div>
</div>`

function handleFileSelect(evt) {
    let files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          let span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
let files = document.querySelectorAll('#files');
for(let i = 0; i < files.length; i++)
  files[i].addEventListener('change', handleFileSelect, false);
