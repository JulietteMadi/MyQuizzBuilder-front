import{_ as l,o as d,c as a,a as t,t as c}from"./index-5f72cd32.js";const u={props:{quizName:{type:String,default:null},index:{type:String,default:null}},methods:{enableTooltip(n){const e=document.getElementById(n);bootstrap.Tooltip.getOrCreateInstance(e).enable()}}},_={class:"card shadow"},b=t("div",{class:"card-header quiz-header",style:{height:"5rem"}},null,-1),r={class:"blue-background p-2"},h={class:"text-white"},g={class:"p-3 row"},m={class:"col d-flex justify-content-center p-0"},f=["id"],p=t("i",{class:"bi bi-pencil-square"},null,-1),v=[p],x={class:"col d-flex justify-content-center p-0"},y=["id"],z=t("i",{class:"bi bi-trash3-fill"},null,-1),Q=[z],T={class:"col d-flex justify-content-center p-0"},w=["id"],M=t("i",{class:"bi bi-share-fill"},null,-1),j=[M],q={class:"col d-flex justify-content-center p-0"},B=["id"],I=t("i",{class:"bi bi-download"},null,-1),S=[I];function k(n,e,o,N,E,s){return d(),a("div",_,[b,t("div",r,[t("h5",h,c(o.quizName),1)]),t("div",g,[t("div",m,[t("button",{id:"modifyQuiz"+o.index,class:"btn secundary-button mt-2",onMouseover:e[0]||(e[0]=i=>s.enableTooltip(`modifyQuiz${o.index}`)),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Modifier",disabled:""},v,40,f)]),t("div",x,[t("button",{id:"cancelQuiz"+o.index,class:"btn secundary-button mt-2",onMouseover:e[1]||(e[1]=i=>s.enableTooltip(`cancelQuiz${o.index}`)),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Supprimer",disabled:""},Q,40,y)]),t("div",T,[t("button",{id:"shareQuiz"+o.index,class:"btn secundary-button mt-2",onMouseover:e[2]||(e[2]=i=>s.enableTooltip(`shareQuiz${o.index}`)),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Partager",disabled:""},j,40,w)]),t("div",q,[t("button",{id:"downloadQuiz"+o.index,class:"btn secundary-button mt-2",onMouseover:e[3]||(e[3]=i=>s.enableTooltip(`downloadQuiz${o.index}`)),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Télécharger le rapport",disabled:""},S,40,B)])])])}const D=l(u,[["render",k]]);export{D as Q};