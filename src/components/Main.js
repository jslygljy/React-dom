require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import utils from './utils'
//import TodoModel  from './todoModel'

let ENTER_KEY = 13;
//let Allstats = 'all';

class AppComponent extends React.Component {
  constructor(prop){
    super(prop);
    this.state={
      TodoItem:'',
      Todos:utils.store('react-todos')
    };
  }
  getInitialState(){
      //获取this.state的默认值
      this.state={
        TodoItem:'',
        Todos:utils.store('react-todos')
      };
  }
  inform() {
    utils.store('react-todos', this.state.Todos);
    this.setState({Todos:utils.store('react-todos')})
  }
  updata() {
    this.setState({Todos:utils.store('react-todos')})
  }
  handleChange() {
    this.setState({TodoItem:event.target.value})
  }
  onkeyDown (event) {
      if(event.keyCode === ENTER_KEY){
          this.state.Todos = this.state.Todos.concat({
            title:event.target.value,
            completed: false
          });
          this.inform();
      }
  }
  render() {
    return (
      <div>
          <input type="text" className ='input' placeholder='what to do need' onChange={this.handleChange.bind(this) } onKeyDown = {this.onkeyDown.bind(this)}/>
          <TodoList datas={this.state.Todos} callback={this.updata.bind(this)}></TodoList>
      </div >
    );
  }
}

class TodoList extends React.Component {
  constructor(prop){
    super(prop);
    this.state={
      TodoItem:'',
      Todos:this.props.datas
    };
  }
  componentWillReceiveProps(){
      //该方法发生在this.props被修改或父组件调用setProps()方法之后
      this.state={
        TodoItem:'',
        Todos:utils.store('react-todos')
      };
  }
  inform() {
    utils.store('react-todos',this.state.Todos);
    this.setState({Todos:utils.store('react-todos')})
    this.props.callback();
  }
  handleClick(index) {
      this.state.Todos[index].completed = !this.state.Todos[index].completed;
      this.inform();
  }
  handleclearAll() {
    this.state.Todos = this.state.Todos.filter(function (todo) {
      return !todo.completed;
    });
    this.inform();
  }
  handleremove(index) {
      this.state.Todos.splice(index,1);
      this.inform();
  }
  handleChange(e) {
    if(e.target.value === 'all'){
      this.state.Todos.map(function (todo) {
        todo.completed = true;
      });
      this.inform();
    }else{
      this.state.Todos.map(function (todo) {
        todo.completed = false;
      });
      this.inform();
    }
  }
  render() {
      console.log(this.state.Todos)
      var _this = this;
      var main;
      var controllist;
      var todos = utils.store('react-todos');
      if (todos.length>0) {
        main =
          todos.map(function(data,index){
              return(
                  <div className='listItem' key={index}>
                    <p  className={data.completed?'listchoose':'listli'}
                      onClick={_this.handleClick.bind(_this,index)}>
                      <span className='listradio'></span>
                      {data.title}
                    </p>
                    <span onClick={_this.handleremove.bind(_this,index)} className='listClose'>X</span>
                  </div>
              )
          });
          controllist =
            <div>
                <select onChange={this.handleChange.bind(_this)}>
                  <option value='all'>全选</option>
                  <option value='no'>全不选</option>
                </select>
                <span onClick={this.handleclearAll.bind(_this)}>clear completed</span>
            </div>
      }
      return(
          <div>
               {main}
               {controllist}
          </div>
      )
  }
}

AppComponent.getInitialState = {
      TodoItem:'',
      Todos:utils.store('react-todos')
};


export default AppComponent;
