import{_ as p,r as f,o as i,c as a,b as e,F as r,d as b,g as m,e as g,w as v,f as k,h as u,v as h}from"./index-6708bb01.js";const y={data(){return{theme:{name:"",guides:[]}}},computed:{invalidForm(){return this.theme.guides<4}},methods:{addGuide(){this.theme.guides.push({name:"",link:"",image:""})},deleteGuide(n){this.theme.guides.splice(n,1)}}},N=e("h1",null,"Créer un thème",-1),V={class:"my-5"},x={class:"outlined my-4 p-4"},C=k('<div class="row"><div class="col-12"><label for="name" class="fs-5">Nom du thème</label><input name="name" id="name" type="text" maxlength="255" class="form-control" placeholder="Ex : recrutement"></div><div class="cols-12 my-4"><p>Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème.<br> Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs du quizz verront !</p></div></div>',1),L={class:"col-12 col-md-11"},$=["for"],w=["name","id","onUpdate:modelValue"],G={class:"d-flex"},z={class:"col-6 pe-2"},T=["for"],U=["name","id","onUpdate:modelValue"],q={class:"col-6 ps-2"},B=["for"],F=["id"],j={class:"col-12 col-md-1 align-self-center"},A=["onClick"],E=e("i",{class:"bi bi-plus-circle"},null,-1),I={class:"align-items-end flex-column row"},R=["disabled"],D=e("i",{class:"bi bi-plus-circle"},null,-1);function M(n,c,S,H,d,l){const _=f("RouterLink");return i(),a(r,null,[N,e("form",V,[e("div",x,[C,(i(!0),a(r,null,b(d.theme.guides,(s,t)=>(i(),a("div",{class:"row my-5 d-flex",key:t},[e("div",L,[e("label",{for:`guideName${t}`,class:"fs-6"},"Nom de la fiche",8,$),u(e("input",{name:`guideName${t}`,id:`guideName${t}`,"onUpdate:modelValue":o=>s.name=o,type:"text",maxlength:"100",class:"form-control mb-2"},null,8,w),[[h,s.name]]),e("div",G,[e("div",z,[e("label",{for:`guideLink${t}`},"Lien vers la fiche",8,T),u(e("input",{name:`guideLink${t}`,id:`guideLink${t}`,"onUpdate:modelValue":o=>s.link=o,type:"text",maxlength:"255",class:"form-control"},null,8,U),[[h,s.link]])]),e("div",q,[e("label",{for:`guideImage${t}`},"Lien vers l'image d'illustration",8,B),e("input",{class:"form-control",type:"file",id:`guideImage${t}`},null,8,F)])])]),e("div",j,[e("i",{class:"bi bi-trash3-fill primary clickable-icon",style:{"font-size":"1.5rem",color:"var(--second-dark-color)"},onClick:o=>l.deleteGuide(t),"data-bs-toggle":"tooltip","data-bs-placement":"top","data-bs-title":"Tooltip on top"},null,8,A)])]))),128)),e("button",{class:"btn secundary-button mt-2",onClick:c[0]||(c[0]=(...s)=>l.addGuide&&l.addGuide(...s)),type:"button"},[E,m(" Ajouter une fiche ")])]),e("div",I,[g(_,{to:"/themes"},{default:v(()=>[e("button",{class:"btn primary-button mt-2 col-12 col-md-3",type:"submit",disabled:d.theme.guides.length<5},[D,m(" Créer un thème ")],8,R)]),_:1})])])],64)}const K=p(y,[["render",M]]);export{K as default};