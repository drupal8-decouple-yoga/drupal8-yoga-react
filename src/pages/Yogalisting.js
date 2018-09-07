import React, { Component } from 'react';
import { Link  } from 'react-router-dom';

var axios = require('axios');



var headers = {
  'Content-Type': 'application/vnd.api+json',
  'Accept': 'application/vnd.api+json'
}

var url ='https://dev-d8one-yoga-hub.pantheonsite.io';

class Yogalisting extends Component{
 constructor(props) {
        super(props)

        this.state = {
          yogaListAll:[]
        }
      }
  componentDidMount() {

    axios.get(url+'/jsonapi/node/yoga_asana/?fields[node--yoga_asana]=nid,uuid,langcode,title,path,field_asana_name,field_asana_sanskrit_name,field_asana_meaning,field_asana_biopic&include=field_asana_biopic&fields[file--file]=fid,uuid,meta,filename,url', headers).then(response => {
      this.setState({
        yogaListAll:response.data.data
      })
    })
  }

  truncate(s) {
    console.log(s.length);
    if (s.length > 200)
         return s.substring(0, 200);
      else
         return s; 
}
  
  render(){
    return (
      <div className="session-block">
       
      <div className="row">
               {
                 this.state.yogaListAll.map((data) => {
                    return (
                      <div className="col-sm-12" key={data.id}>

                      <Link to={'/detailview/'+ data.id}>
                      
                        <div className='well'>
                         
                            <div className="col-sm-6 col-xs-12 text-left">      
                              <h1 className="yoga-title">{data.attributes.title}</h1>
                              <p className="yoga-desc" dangerouslySetInnerHTML={{__html:  data.attributes.field_asana_meaning.value}}></p>
                            </div>
                            <div className="col-sm-6 col-xs-12 img-block">
                              <img className="img-responsive" alt="asana-img" src={url+data.relationships.field_asana_biopic.data.attributes.url} />
                            </div>
                          
                        </div>
                      </Link>

                      </div>
                    )
                 })
               }
           
            </div>

      </div>
    )
  }
}

export default Yogalisting;