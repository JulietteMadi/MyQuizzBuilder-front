import{_ as v,o as a,c as l,a as e,t as u,h,v as w,n as b,K as p,F as c,r as g,b as r,d as f,p as y,e as q,f as I,m as z,i as k,u as Q}from"./index-5f72cd32.js";const A={props:{answer:{type:Object,default:{}},questionIndex:{type:Number},answerIndex:{type:Number},answersLength:{type:Number}},computed:{deleteDisabled(){return this.answersLength<=2},tooltipMessage(){return this.answer.valid?"Passer la réponse en non-valide":"Passer la réponse en valide"}},methods:{enableTooltip(n,s){if(!s){const t=document.getElementById(n);bootstrap.Tooltip.getOrCreateInstance(t).enable()}},disableTooltip(n){const s=document.getElementById(n);bootstrap.Tooltip.getOrCreateInstance(s).dispose()}}},D=["for"],C={class:"row mb-2"},T={class:"input-group"},N=["name","id"],M=["for"],V=["id","data-bs-original-title"],S=["id"],B=["id"];function L(n,s,t,_,x,i){return a(),l(c,null,[e("label",{for:`answer${n.index}`}," Réponse "+u(t.answerIndex+1),9,D),e("div",C,[e("div",T,[h(e("input",{name:`answer${t.questionIndex}-${t.answerIndex}`,id:`answer${t.questionIndex}-${t.answerIndex}`,type:"text",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=d=>t.answer.name=d)},null,8,N),[[w,t.answer.name]]),e("div",{class:b(["input-group-text",{"bg-success":t.answer.valid}])},[e("label",{for:`checkAnswer${t.questionIndex}-${t.answerIndex}`},[e("i",{id:"checkAnswerIcon"+t.questionIndex+t.answerIndex,onMouseover:s[1]||(s[1]=d=>i.enableTooltip("checkAnswerIcon"+t.questionIndex+t.answerIndex)),class:b(["bi bi-check-lg clickable-icon",{"text-white":t.answer.valid}]),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":i.tooltipMessage},null,42,V)],8,M)],2),e("div",{class:b(["input-group-text",{"bg-danger":!i.deleteDisabled}])},[e("i",{id:"deleteAnswer"+t.questionIndex+t.answerIndex,onClick:s[2]||(s[2]=d=>(n.$emit("deleteAnswer",t.questionIndex),i.disableTooltip(`deleteAnswer${t.questionIndex}${t.answerIndex}`))),onMouseover:s[3]||(s[3]=d=>i.enableTooltip(`deleteAnswer${t.questionIndex}${t.answerIndex}`,i.deleteDisabled)),class:b(["bi bi-trash3-fill primary",{"clickable-icon text-white":!i.deleteDisabled}]),style:{color:"var(--second-dark-color)"},"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Supprimer la réponse"},null,42,S)],2)]),h(e("input",{class:"form-check-input invisible",type:"checkbox",value:"",id:`checkAnswer${t.questionIndex}-${t.answerIndex}`,"onUpdate:modelValue":s[4]||(s[4]=d=>t.answer.valid=d)},null,8,B),[[p,t.answer.valid]])])],64)}const $=v(A,[["render",L]]),j={props:{question:{type:Object,default:{}},topics:{type:Array,default:[]},questionIndex:{type:Number,default:0},activeIndex:{type:Number,default:0}},components:{QuizAnswer:$},methods:{enableTooltip(n){const s=document.getElementById(n);bootstrap.Tooltip.getOrCreateInstance(s).enable()},deleteAnswer(n){this.question.answers.length>2&&this.question.answers.splice(n,1)},addAnswer(){this.question.answers.push({name:"",valid:!1})}}},E=["id"],O={class:"col-11 pe-0"},U=["data-bs-target"],P={key:0},R={class:"col-1 px-0 d-flex justify-content-center align-items-center"},F={class:"btn","data-bs-toggle":"modal","data-bs-target":"#warningModal",type:"button"},J=["id","data-bs-original-title"],K=["id"],G={class:"accordion-body"},H={class:"row"},W={class:"col-12"},X=["for"],Y=["name","id"],Z={class:"row"},ee={class:"col-12"},te=["for"],se=["id","name"],ne={class:"row mt-5"},oe={class:"col-12"},ie={class:"col-12"},ae={class:"col-12 mt-2"},le=["disabled"],de={key:0},ue=e("i",{class:"bi bi-plus-circle me-3"},null,-1),re={key:1},ce=["for"],me=e("h3",null,"Description de la ou les bonne(s) réponse(s)",-1),be=[me],he=["id","name"];function _e(n,s,t,_,x,i){const d=g("QuizAnswer");return a(),l(c,null,[e("h3",{class:"accordion-header row d-flex me-0",id:`heading${t.questionIndex}`},[e("div",O,[e("button",{class:"accordion-button",type:"button","data-bs-toggle":"collapse","data-bs-target":`#collapse${t.questionIndex}`},[r(" Question "+u(t.questionIndex+1)+" ",1),t.question.name?(a(),l("span",P," : "+u(t.question.name),1)):f("",!0)],8,U)]),e("div",R,[e("button",F,[e("i",{class:"bi bi-trash3-fill primary clickable-icon",id:"deleteQuestion"+t.questionIndex,style:{"font-size":"1.5rem",color:"var(--second-dark-color)"},onClick:s[0]||(s[0]=o=>n.$emit("askDeleteQuestion",t.questionIndex)),"data-bs-toggle":"tooltip","data-bs-custom-class":"bg-tooltip","data-bs-original-title":"Supprimer la question "+(t.questionIndex+1),onMouseover:s[1]||(s[1]=o=>i.enableTooltip(`deleteQuestion${t.questionIndex}`))},null,40,J)])])],8,E),e("div",{id:`collapse${t.questionIndex}`,class:b(["accordion-collapse collapse",{show:t.activeIndex===t.questionIndex}]),"data-bs-parent":"#questionsList"},[e("div",G,[e("div",H,[e("div",W,[e("label",{for:`questionName${t.questionIndex}`,class:"fs-6"},"Question",8,X),h(e("input",{name:`questionName${t.questionIndex}`,id:`questionName${t.questionIndex}`,"onUpdate:modelValue":s[2]||(s[2]=o=>t.question.name=o),type:"text",class:"form-control mb-2"},null,8,Y),[[w,t.question.name]])])]),e("div",Z,[e("div",ee,[e("label",{for:`questionTopic${t.questionIndex}`}," Choisissez le thème de votre question : ",8,te),h(e("select",{class:"form-select",id:`questionTopic${t.questionIndex}`,name:`questionTopic${t.questionIndex}`,"onUpdate:modelValue":s[3]||(s[3]=o=>t.question.topic=o)},[(a(!0),l(c,null,q(t.topics,(o,m)=>(a(),l("option",null,u(o.name),1))),256))],8,se),[[y,t.question.topic]])])]),e("div",ne,[e("div",oe,[e("h3",null,"Proposez "+u(t.question.answers.length)+" réponses puis cochez la ou les bonne(s) réponse(s) :",1)]),(a(!0),l(c,null,q(t.question.answers,(o,m)=>(a(),l("div",ie,[I(d,{answer:o,questionIndex:t.questionIndex,answerIndex:m,answersLength:t.question.answers.length,onDeleteAnswer:i.deleteAnswer},null,8,["answer","questionIndex","answerIndex","answersLength","onDeleteAnswer"])]))),256)),e("div",ae,[e("button",{class:"btn primary-button-outlined col-12",onClick:s[4]||(s[4]=(...o)=>i.addAnswer&&i.addAnswer(...o)),disabled:t.question.answers.length>=10,type:"button"},[t.question.answers.length<10?(a(),l("span",de,[ue,r(" Ajouter une proposition de réponse ")])):(a(),l("span",re," Vous ne pouvez pas proposer plus de 10 réponses "))],8,le)])]),e("div",null,[e("label",{for:`answerDescription${t.questionIndex}`,class:"form-label mt-5"},be,8,ce),e("textarea",{class:"form-control",id:`answerDescription${t.questionIndex}`,name:`answerDescription${t.questionIndex}`,rows:"5"},null,8,he)])])],10,K)],64)}const qe=v(j,[["render",_e]]),ve={data(){return{quiz:{name:"",questions:[]},indexDelete:0,topics:[{id:1,name:"Recrutement"},{id:2,name:"Onboarding"},{id:3,name:"Sensibilisation"},{id:4,name:"RSE en grand groupe"},{id:5,name:"Jeunes entrepreneurs"},{id:6,name:"Parité en entreprise"},{id:7,name:"Formations internes"},{id:8,name:"Rédaction de fiche emploi"},{id:9,name:"Sélectionner les CV"}],activeIndex:0}},components:{QuizQuestions:qe},computed:{...z(Q,["token"])},mounted(){this.addQuestion(),this.getAllTopics()},methods:{createQuiz(){this.$router.push({name:"quiz"})},addQuestion(){this.quiz.questions.push({name:"",topic:"",answers:[{name:"",valid:!1},{name:"",valid:!1}],answerDescription:""});const n=this.quiz.questions.length-1;this.activeIndex=n},askDeleteQuestion(n){this.indexDelete=n},deleteQuestion(n){this.quiz.questions.splice(n,1)},async getAllTopics(){const n={Authorization:`Bearer ${this.token}`},s=await this.$http.get("/topics",{headers:n});s.status==200||s.status==204?this.topics=s.body:console.error(s)}}},we={class:"modal fade",id:"warningModal",tabindex:"-1"},xe={class:"modal-dialog"},ge={class:"modal-content"},fe={class:"modal-header"},Ie={class:"modal-title fs-5 text-danger",id:"exampleModalLabel"},pe=e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal"},null,-1),ye={class:"modal-body"},ze={key:0},ke={class:"modal-footer"},Qe=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Annuler",-1),Ae=e("h1",null,"Créer un quiz",-1),De={class:"outlined my-4 p-4"},Ce={class:"row"},Te={class:"col-12 col-md-8"},Ne=e("label",{for:"name",class:"fs-5 mt-2"},"Nom du Quiz",-1),Me=e("div",{class:"col-12 col-md-4"},[e("label",{for:"image",class:"fs-5 mt-2"},"Illustration du quiz"),e("input",{class:"form-control",type:"file",id:"image"})],-1),Ve=e("div",{class:"col-12 my-4"},[e("p",null,[r("Veuillez ajouter entre 5 et 50 questions pour votre quiz"),e("br"),r(" Attention au choix de l’image et du nom de votre quiz, ce sont les informations que les utilisateurs verront !")])],-1),Se={class:"accordion",id:"questionsList"},Be=e("i",{class:"bi bi-plus-circle",id:"addButton"},null,-1),Le={class:"align-items-end flex-column px-2 row mb-5"},$e=e("i",{class:"bi bi-plus-circle me-3"},null,-1);function je(n,s,t,_,x,i){const d=g("QuizQuestions");return a(),l(c,null,[e("div",we,[e("div",xe,[e("div",ge,[e("div",fe,[e("h1",Ie,"Êtes-vous sûr.e de vouloir supprimer la question "+u(n.indexDelete+1)+" ?",1),pe]),e("div",ye,[r(" Cette action est irréversible, et vous perdrez toute la question "+u(n.indexDelete+1)+" : ",1),n.quiz.questions[n.indexDelete]?(a(),l("b",ze,u(n.quiz.questions[n.indexDelete].name),1)):f("",!0)]),e("div",ke,[Qe,e("button",{type:"button",class:"btn btn-danger","data-bs-dismiss":"modal",onClick:s[0]||(s[0]=o=>i.deleteQuestion(n.indexDelete))},"Supprimer")])])])]),Ae,e("form",{class:"my-5",onSubmit:s[3]||(s[3]=k(o=>i.createQuiz(),["prevent"]))},[e("div",De,[e("div",Ce,[e("div",Te,[Ne,h(e("input",{name:"name",id:"name",type:"text",maxlength:"255",class:"form-control",placeholder:"Ex : recrutement","onUpdate:modelValue":s[1]||(s[1]=o=>n.quiz.name=o)},null,512),[[w,n.quiz.name]])]),Me,Ve]),e("div",Se,[(a(!0),l(c,null,q(n.quiz.questions,(o,m)=>(a(),l("div",{class:"accordion-item",key:m,ref_for:!0,ref:"accordionItems"},[I(d,{question:o,questionIndex:m,topics:n.topics,activeIndex:n.activeIndex,onAskDeleteQuestion:i.askDeleteQuestion},null,8,["question","questionIndex","topics","activeIndex","onAskDeleteQuestion"])]))),128)),e("button",{class:"btn secundary-button mt-4",onClick:s[2]||(s[2]=(...o)=>i.addQuestion&&i.addQuestion(...o)),type:"button"},[Be,r(" Ajouter une question ")])])])],32),e("div",Le,[e("button",{class:"btn primary-button mt-2 col-12 col-md-3",type:"submit",onClick:s[4]||(s[4]=(...o)=>i.createQuiz&&i.createQuiz(...o))},[$e,r(" Créer un quiz ")])])],64)}const Oe=v(ve,[["render",je]]);export{Oe as default};
