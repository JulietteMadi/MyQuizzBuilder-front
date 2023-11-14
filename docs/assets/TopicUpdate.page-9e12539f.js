import{_ as f,k as b,m as v,l as g,r as G,o as n,c as u,a as i,t as q,h as $,v as y,n as _,F as d,e as A,b as o,i as U,u as m,f as L}from"./index-cac0b148.js";import{G as k}from"./GuideItem-3b399bc6.js";import{u as x,r as c,a as p,m as D}from"./index-91f46439.js";const T={setup(){return{route:b(),v$:x({$autoDirty:!0})}},data(){return{id:this.route.params.id,topic:{name:this.route.params.name,guides:[{name:"Savoir quand former un collaborateur",url:"www.mqb.fr/savoir-quand-former",image:"www.temp.fr"},{name:"Discriminations : les biais en recrutement",url:"www.mqb.fr/discrimination-biais-recrutement",image:"www.temp.fr"}]},allGuides:[{name:"Former les cadres supérieurs",url:"www.mqb.fr/former-cadres-superieurs",image:"www.temp.fr"},{name:"Savoir quand former un collaborateur",url:"www.mqb.fr/savoir-quand-former",image:"www.temp.fr"},{name:"Discriminations : les biais en recrutement",url:"www.mqb.fr/discrimination-biais-recrutement",image:"www.temp.fr"},{name:"Onboarding en 5 étapes",url:"www.mqb.fr/onboarding-5-etapes",image:"www.temp.fr"}],availableGuides:[{name:"Former les cadres supérieurs",url:"www.mqb.fr/former-cadres-superieurs",image:"www.temp.fr"},{name:"Savoir quand former un collaborateur",url:"www.mqb.fr/savoir-quand-former",image:"www.temp.fr"},{name:"Discriminations : les biais en recrutement",url:"www.mqb.fr/discrimination-biais-recrutement",image:"www.temp.fr"},{name:"Onboarding en 5 étapes",url:"www.mqb.fr/onboarding-5-etapes",image:"www.temp.fr"}]}},validations(){return{topic:{name:{required:c,maxLength:p(100)},guides:{required:c,maxLength:p(50),minLength:D(5)}}}},components:{GuideItem:k},computed:{...v(m,["token"]),invalidForm(){return this.topic.guides<4||!this.guide.name}},created(){},methods:{...g(m,["resetUser"]),addGuide(){this.updateAvailableGuides(),this.topic.guides.push({name:"",url:"",image:""})},deleteGuide(e){this.topic.guides.splice(e,1),this.updateAvailableGuides()},updateAvailableGuides(){this.availableGuides=[];const e=this.topic.guides.map(s=>s.url);this.allGuides.filter(s=>!e.includes(s.url)).forEach(s=>{this.availableGuides.push(s)})},guidesFormat(){this.topic.guides.forEach(e=>{if(!e.id){const t=this.allGuides.filter(s=>e.url===s.url);e.id=t[0].id}e.noUpdate&&(delete e.name,delete e.url,delete e.image),delete e.noUpdate})},async initTopic(){const e={Authorization:`Bearer ${this.token}`},t=await this.$http.get(`/topics/${this.id}`,{headers:e});t.status===204||t.status===200?(this.topic=t.body,this.topic.guides.forEach(s=>{s.noUpdate=!0}),this.updateAvailableGuides()):(console.error(t),this.$router.push({name:"topics"}),this.$toast.error("toast-app","Une erreur est survenue"))},async initGuides(){const e={Authorization:`Bearer ${this.token}`},t=await this.$http.get("/guides",{headers:e});t.status===204||t.status===200?(this.allGuides=t.body,await this.initTopic()):(console.error(t),this.$router.push({name:"topics"}),this.$toast.error("toast-app","Une erreur est survenue"))},async updateTopic(){if(await this.v$.$validate()){this.guidesFormat(),console.log(this.topic);const t={Authorization:`Bearer ${this.token}`},s=await this.$http.put(`/topics/${this.id}`,this.topic,{headers:t});s.status===204||s.status===200?(this.$toast.success("toast-app",`Le guide ${this.topic.name} a bien été modifié`),this.$router.push({name:"themes"})):this.$toast.error("toast-app","Les informations de votre thème ne sont pas valides")}else this.$toast.error("toast-app","Les informations de votre thème ne sont pas valides")}}},z={class:"outlined my-4 p-4"},F={class:"row"},S={class:"col-12"},B=i("label",{for:"name",class:"fs-5"},"Nom du thème",-1),V=i("div",{class:"cols-12 my-4"},[i("p",null,[o("Veuillez ajouter entre 5 et 50 fiches pratiques associées à ce thème."),i("br"),o(" Attention au choix de l’image et du nom de la fiche, ce sont les informations que les utilisateurs du quizz verront !")])],-1),E=i("i",{class:"bi bi-plus-circle"},null,-1),M=i("div",{class:"align-items-end flex-column row"},[i("button",{class:"btn primary-button mt-2 col-12 col-md-3",type:"submit"},[i("i",{class:"bi bi-pencil-square"}),o(" Modifier le thème ")])],-1);function N(e,t,s,h,C,r){const w=G("GuideItem");return n(),u(d,null,[i("h1",null,'Modifier le thème "'+q(e.topic.name)+'"',1),i("form",{class:"my-5",onSubmit:t[2]||(t[2]=U((...a)=>r.updateTopic&&r.updateTopic(...a),["prevent"]))},[i("div",z,[i("div",F,[i("div",S,[B,$(i("input",{name:"name",id:"name",type:"text",class:_(["form-control",{"is-invalid":h.v$.topic.name.$error}]),placeholder:"Ex : recrutement","onUpdate:modelValue":t[0]||(t[0]=a=>e.topic.name=a)},null,2),[[y,e.topic.name]])]),V]),(n(!0),u(d,null,A(e.topic.guides,(a,l)=>(n(),u("div",{class:"row py-3 my-5 d-flex",key:l},[L(w,{index:l,guide:a,availableGuides:e.availableGuides,allGuides:e.allGuides,onDeleteGuide:r.deleteGuide,onUpdateGuidesList:r.updateAvailableGuides},null,8,["index","guide","availableGuides","allGuides","onDeleteGuide","onUpdateGuidesList"])]))),128)),i("button",{class:"btn secundary-button mt-2",onClick:t[1]||(t[1]=(...a)=>r.addGuide&&r.addGuide(...a)),type:"button"},[E,o(" Ajouter une fiche ")])]),M],32)],64)}const R=f(T,[["render",N]]);export{R as default};
