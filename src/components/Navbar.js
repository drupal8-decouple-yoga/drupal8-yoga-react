import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
  render(){
    return(
           <nav className="navbar navbar-default navbar-fixed-top">

          <div className="container-fluid">
            
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">D8One Yoga Hub</a>
            </div>


              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                  <li className="active" data-toggle="collapse" data-target=".navbar-collapse" ><Link to={'/yogalist'}>Yoga-List</Link></li>
                </ul>

              </div>

          </div>
        </nav>
    )
  }
}