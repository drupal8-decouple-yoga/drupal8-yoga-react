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
      allData:[],
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

    var yogaAsanaBiopic_new,yogaAsanaDificulty_new,yogaAsanaBenefitTags_new = [] ,
      yogaAsanaSteps_new = [];
    let that = this;
    let mypromise = new Promise((resolve, reject) => {
      axios.get(options , headers).then(response => {
      resolve(response.data);
      });
    });
      
      
    mypromise.then(function(result) {
      //console.log(result)
      that.setState({
        allData:result
       });
       result.included.forEach(function(val,index) { 
         if(val.type==="taxonomy_term--asana_difficulty_level"){
            yogaAsanaDificulty_new=val.attributes.name;
         }
         else if(val.type==="file--file"){
            yogaAsanaBiopic_new=val.attributes.url;
         }
         else if(val.type==="taxonomy_term--asana_benefits"){
            yogaAsanaBenefitTags_new.push(val.attributes.name);
         }
         else if(val.type==="paragraph--asana_steps"){
            var obj =[];
            obj['0'] = val.attributes.field_asana_step_number;
            obj['1'] = val.attributes.field_asana_step_instruction.value;
            if(val.relationships.field_asana_image.data!=null){
              obj['2'] = val.relationships.field_asana_image.data.id;
            }else{
              obj['2'] ='';
            }
            yogaAsanaSteps_new.push(obj);
         }
      }) 
    });
      
    mypromise.then(function(result) {

      //console.log(yogaAsanaSteps_new)
      yogaAsanaSteps_new.forEach(function(val,index) {
        //console.log(val['2']);
        let mypromise_get_stepimg = new Promise((resolve, reject) => {
          //console.log(val['2']);
          if(val['2']!==""){
            axios.get(url+'/jsonapi/file/file/'+val['2'], headers).then(response => { 
            //console.log(response.data.included)
            resolve(url+response.data.data.attributes.url);
          });
          }else{
            resolve(val['2']);
          }
        });
        mypromise_get_stepimg.then(function(result) {
          yogaAsanaSteps_new[index]['2'] = (result);
          that.setState({
            yogaAsanasTitle:that.state.allData.data.attributes.title,
            yogaAsanaName:that.state.allData.data.attributes.field_asana_name,
            yogaAsanaSanskritName:that.state.allData.data.attributes.field_asana_sanskrit_name,
            yogaAsanaMeaning:that.state.allData.data.attributes.field_asana_meaning.value,

            yogaAsanaDificulty:yogaAsanaDificulty_new,
            yogaAsanaBenefitTags:yogaAsanaBenefitTags_new,
            yogaAsanaBiopic:yogaAsanaBiopic_new,
            yogaAsanaSteps: yogaAsanaSteps_new,

            yogaAsanaPronunciation:that.state.allData.data.attributes.field_asana_pronunciation, 
            yogaAsanaDurationRepeatation:that.state.allData.data.attributes.field_asana_duration_repetition.value,
            yogaAsanaBenefitsDesc:that.state.allData.data.attributes.field_asana_benefits.value,
          });
        });   
      });
    });

  } 
  
  render(){
    return (
      <div className="detail-block text-left">
       
      <div className="row">
               {
                  <div className="col-sm-12">
                    <div className='well'>
                    <div className="section-blocks title-block">
                      <h1>{ this.state.yogaAsanasTitle }</h1>
                      <p><label>Asana Sanskrit Name :</label> { this.state.yogaAsanaSanskritName }</p>
                      <p><label>Asana Pronunciation :</label> { this.state.yogaAsanaPronunciation }</p>
                      <p><label>Asana Name :</label> { this.state.yogaAsanaName }</p>
                    </div>
                    <div className="section-blocks diff-mean-block">
                      <p><label>Asana Meaning :</label></p>
                      <p className="yoga-desc html_p" dangerouslySetInnerHTML={{__html:  this.state.yogaAsanaMeaning}}></p>
                      
                      <img className="img-responsive biopic" src={url+this.state.yogaAsanaBiopic} alt="asana-biopic" />
                      
                    </div>
                    <div className="section-blocks diff-mean-block">
                      <p><label>Dificulty :</label> { this.state.yogaAsanaDificulty }</p>
                    </div>
                    
                    <div className="section-blocks steps-block">
                      <p><label>Asana Steps :</label></p>
                      <div className="steps-container">
                      {this.state.yogaAsanaSteps.map((item, index) => (
                        <div className="steps col-sm-12"  key={index} >
                          <div className="steps-num col-sm-1 text-center">
                            {item[0]}
                          </div>
                          <div className="steps-instruction col-sm-4 col-xs-12">
                          <p className="yoga-desc html_p" dangerouslySetInnerHTML={{__html:  item[1]}}></p>

                          </div>
                          <div className="steps-img col-sm-4 col-xs-12">
                            <img className="img-responsive steps-img" src={item[2]} />
                          </div>
                        </div>
                      ))}
                    </div>
                    </div>
                    <div className="section-blocks duration-block">
                      <p><label>Asana Duration Repetition :</label></p>
                      <p className="yoga-duration-repeat html_p" dangerouslySetInnerHTML={{__html:  this.state.yogaAsanaDurationRepeatation}}></p>
                    </div>
                    <div className="section-blocks benefit-block">
                      <p><label>Asana Benefits :</label></p>
                      <p className="yoga-benefit html_p" dangerouslySetInnerHTML={{__html:  this.state.yogaAsanaBenefitsDesc}}></p>
                    </div>
                    <div className="section-blocks benefit-tags-block">
                      <p><label>Asana Benefits Tags :</label></p>
                      {this.state.yogaAsanaBenefitTags.map((item, index) => (
                      <span className="label label-info" key={index}>{item} <span className="glyphicon glyphicon-tag" aria-hidden="true"></span></span>
                      ))}
                    </div>
                   </div>
                  </div>
               }
                                                   
            </div>

      </div>
    )
  }
}

export default Detailview;