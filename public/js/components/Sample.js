import React from 'react';
import _ from 'underscore'
import Emoji from './Emoji'
export default class Sample extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			tjMsg:''
		};
	}

	onChange (value){
      console.log(' changed ', value);
      this.setState({tjMsg: value})
  }

	render() {
		return(
			<div>
				<button onClick={()=>this.setState({tjMsg:""})}>清理文本</button>
				<Emoji onChange={this.onChange.bind(this)}
					scriptString={this.state.tjMsg} />
			</div>
		);
	}
}
