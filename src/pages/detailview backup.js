import React,{ Component } from 'react';
var axios = require('axios');
var headers = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

var url ='https://dev-d8one-yoga-hub.pantheonsite.io';


class Detailview extends Component{
   constructor(props) {
        super(props)

        this.state = {
          yogaAsanaTitle:[],
          yogaAsanaName:[],
          yogaAsanaSanskritName:[],
          yogaAsanaMeaning : [],
          yogaAsanaDificulty : [],
          yogaAsanaPronunciation : [],
          yogaAsanaBiopic : [],
          yogaAsanaSteps : [],
          yogaAsanaSteps_imgs : [],
          yogaAsanaDurationRepeatation : [],
          yogaAsanaBenefitsDesc : [],
          yogaAsanaBenefitTags : [],
        }
      }
    componentDidMount(){
    
      let options =url+'/jsonapi/node/yoga_asana/'+ this.props.match.params.id +'?include=field_asana_benefits_tags,field_asana_difficulty,field_asana_steps,field_asana_biopic&fields[taxonomy_term--asana_benefits]=uuid,tid,name,path&fields[taxonomy_term--asana_difficulty_level]=uuid,tid,name,path&fields[paragraph--asana_steps]=uuid,id,field_asana_step_number,field_asana_step_instruction,field_asana_image&fields[file--file]=fid,uuid,meta,filename,url'
      
    
      axios.get(options , headers).then(response => {
       //console.log(response.data.included)

        var yogaAsanaBiopic_new,yogaAsanaDificulty_new,yogaAsanaBenefitTags_new = [] ,
            yogaAsanaSteps_new = [];
            
           response.data.included.forEach(function(val,index) { 
             if(val.type=="taxonomy_term--asana_difficulty_level"){
                yogaAsanaDificulty_new=val.attributes.name;
             }
             else if(val.type=="file--file"){
                yogaAsanaBiopic_new=val.attributes.url;
             }

             else if(val.type=="taxonomy_term--asana_benefits"){
               //console.log(val.attributes.name)
                yogaAsanaBenefitTags_new.push(val.attributes.name+",");
             }
             
             else if(val.type=="paragraph--asana_steps"){
                //console.log(val.relationships.field_asana_image.data.id);
               
               
               var obj =[];
               obj['0'] = val.attributes.field_asana_step_number;
               obj['1'] = val.attributes.field_asana_step_instruction.value;
               obj['2'] = val.relationships.field_asana_image.data.id;

            
              yogaAsanaSteps_new.push(obj);
               
               //console.log( obj['2']);
                //obj['2'] = myPromise;
                 /*[val.attributes.field_asana_step_number,val.attributes.field_asana_step_instruction,val.relationships.field_asana_image.data.id];*/
               //console.log(obj);
              
                //yogaAsanaSteps_new.push(val.attributes.field_asana_step_number);
             }
         
                /* let token = getStepsImage(yogaAsanaSteps_new);
               console.log(token);*/
          })  
        
        
            this.setState({
              yogaAsanasTitle:response.data.data.attributes.title,
              yogaAsanaName:response.data.data.attributes.field_asana_name,
              yogaAsanaSanskritName:response.data.data.attributes.field_asana_sanskrit_name,
              yogaAsanaMeaning:response.data.data.attributes.field_asana_meaning.value,
              
              yogaAsanaDificulty:yogaAsanaDificulty_new,
              yogaAsanaBenefitTags:yogaAsanaBenefitTags_new,
              yogaAsanaBiopic:yogaAsanaDificulty_new,
              yogaAsanaSteps: yogaAsanaSteps_new,
              
            
              
              yogaAsanaPronunciation:response.data.data.attributes.field_asana_pronunciation,
              
              
              yogaAsanaDurationRepeatation:response.data.data.attributes.field_asana_duration_repetition.value,
              yogaAsanaBenefitsDesc:response.data.data.attributes.field_asana_benefits.value,

            })
        console.log(this.state.yogaAsanaSteps);
    });
    } 
  async getStepsImage(data){
     try{
    return await axios.get(url+'/jsonapi/file/file/'+data, headers).then(response => {
       console.log(response)
      
  });
      }
  catch(e){
        console.log('caught error', e);
        // Handle exceptions
    }
  }
  render(){
    return (
      <div className="detail-block">
       
      <div className="row">
               {
                  <div className="col-sm-12">
                    <div className='well'>
                    <p><strong>yogaAsana Name : </strong>{ this.state.yogaAsanasTitle}</p>
                    <p><strong>Description : </strong></p>
                    <p dangerouslySetInnerHTML={{__html:  this.state.yogaAsanaBody}}></p>
                    <p><strong>yogaAsana Time : </strong>{ this.state.yogaAsanaBenefitTags}</p>
                    <p><strong>Room : </strong>

 {this.state.yogaAsanaSteps.map((item, index) => (
      
       <div className='indent' key={index} >

      
    <img className="img-responsive" src={item[2]} />
      </div>
    ))}
     </p>
                    <p><strong>Track : </strong>{ this.state.yogaAsanaTrack}</p>
                   </div>
                  </div>
               }
                                                   
            </div>

      </div>
    )
  }
  async renderSteps(step,index) {
    
     //let that=this;
   await axios.get(url+'/jsonapi/file/file/'+step, headers).then(response => { 
      //console.log(response.data.data.attributes.url)
      
      
       return response.data.data.attributes.url;

                  //console.log( url+response.data.data.attributes.url);
       //return  <img className="img-responsive" src={url+response.data.data.attributes.url} />;

   
                 //resolve(response.data.data.attributes.url);
   //obj['2'] = response.data.data.attributes.url;
  
          });
   /* return steps.map(recipe.Ingredients, ingredient => {
        return (
          <li className="list-group-item" key={ingredient.name}>
              <p>Name: {ingredient.name}, Amount: {ingredient.amount}</p>
        </li>
        );
    });*/
 }
}

export default Detailview;