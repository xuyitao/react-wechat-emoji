import React from 'react';
import _ from 'underscore'

export default class EmojiRow extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			onClick:this.props.onClick,
			imgs:this.props.imgs,
		};
	}


	render() {
		let that = this;
		let entries = [];
		let total = 75;

		entries = _.map(this.state.imgs, function (img) {
			return <td key={img.toString()}>
								<img key={img.toString()} src={`/images/${img}.gif`} ref={img} onClick={that.state.onClick.bind(this, img)}/>
							</td>
		})
			// entries.push(<td>);
			// entries.push();
			// entries.push(</td>);

		return(<tr>
						{
							entries
						}
					</tr>
		);
	}
}
