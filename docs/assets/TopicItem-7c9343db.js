import{_ as n,o as a,c as d,a as o,t as c}from"./index-e330a1bf.js";const r={props:{topic:{type:Object,default:null},index:{type:String,default:null}},methods:{enableTooltip(i){const t=document.getElementById(i);bootstrap.Tooltip.getOrCreateInstance(t).enable()},disableTooltip(i){const t=document.getElementById(i);bootstrap.Tooltip.getOrCreateInstance(t).dispose()}}},b={class:"card shadow"},p=o("div",{class:"card-header topic-header",style:{height:"5rem"}},null,-1),u={class:"red-background p-2"},_={class:"text-white"},m={class:"p-3 row"},g={class:"col d-flex justify-content-center p-0"},T=["id"],f={class:"col d-flex justify-content-center p-0"},v=["id"],h={class:"col d-flex justify-content-center p-0"},y=["id"],x=o("i",{class:"bi bi-share-fill"},null,-1),w=[x],I={class:"col d-flex justify-content-center p-0"},M=["id"],j=o("i",{class:"bi bi-download"},null,-1),k=[j];function B(i,t,e,C,E,s){return a(),d("div",b,[p,o("div",u,[o("h5",_,c(e.topic.name),1)]),o("div",m,[o("div",g,[o("button",{class:"btn primary-button mt-2",id:"modifyTopic"+e.topic.id,"data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Modifier",onClick:t[1]||(t[1]=l=>(i.$emit("updateTopic",e.topic.id,e.topic.name),s.disableTooltip(`modifyTopic${e.topic.id}`)))},[o("i",{class:"bi bi-pencil-square","data-bs-toggle":"tooltip",onMouseover:t[0]||(t[0]=l=>s.enableTooltip(`modifyTopic${e.topic.id}`))},null,32)],8,T)]),o("div",f,[o("button",{class:"btn primary-button mt-2",id:"cancelTopic"+e.topic.id,"data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Supprimer","data-bs-toggle":"modal","data-bs-target":"#warningModalTopic",onClick:t[3]||(t[3]=l=>i.$emit("deleteTopic",e.topic.id))},[o("i",{class:"bi bi-trash3-fill","data-bs-toggle":"tooltip",onMouseover:t[2]||(t[2]=l=>s.enableTooltip(`cancelTopic${e.topic.id}`))},null,32)],8,v)]),o("div",h,[o("button",{class:"btn primary-button mt-2",id:"shareTopic"+e.topic.id,"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Partager",onMouseover:t[4]||(t[4]=l=>s.enableTooltip(`shareTopic${e.topic.id}`)),disabled:""},w,40,y)]),o("div",I,[o("button",{class:"btn primary-button mt-2",id:"downloadTopic"+e.topic.id,"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Télécharger le rapport",onMouseover:t[5]||(t[5]=l=>s.enableTooltip(`downloadTopic${e.topic.id}`)),disabled:""},k,40,M)])])])}const S=n(r,[["render",B]]);export{S as T};