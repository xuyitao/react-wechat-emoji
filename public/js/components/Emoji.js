import React from 'react';
import _ from 'underscore'
import EmojiRow from './EmojiRow'

let keyIndex=1;
export default class Emoji extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			onclick:this.props.onClick,
			types:this.props.types,
			curType:this.props.curType,
			cursorPostion:0,
			show:false
		};
		this.keyIndex = 1;
		this.emojiMap = {
			100:'[微笑]',101:'[撇嘴]',102:'[色]',103:'[发呆]',104:'[得意]',
			105:'[流泪]',106:'[害羞]',107:'[闭嘴]',108:'[睡]',109:'[大哭]',
			110:'[尴尬]',111:'[发怒]',112:'[调皮]',113:'[呲牙]',114:'[惊讶]',

			115:'[难过]',116:'[酷]',117:'[冷汗]',118:'[抓狂]',119:'[吐]',
			120:'[偷笑]',121:'[愉快]',122:'[白眼]',123:'[傲慢]',124:'[饥饿]',
			125:'[困]',126:'[惊恐]',127:'[流汗]',128:'[憨笑]',129:'[悠闲]',

			130:'[奋斗]',131:'[咒骂]',132:'[疑问]',133:'[嘘]',134:'[晕]',
			135:'[疯了]',136:'[衰]',137:'[骷髅]',138:'[敲打]',139:'[再见]',
			140:'[擦汗]',141:'[抠鼻]',142:'[鼓掌]',143:'[糗大了]',144:'[坏笑]',

			145:'[左哼哼]',146:'[右哼哼]',147:'[哈欠]',148:'[鄙视]',149:'[委屈]',
			150:'[快哭了]',151:'[阴险]',152:'[亲亲]',153:'[吓]',154:'[可怜]',
			155:'[菜刀]',156:'[西瓜]',157:'[啤酒]',158:'[篮球]',159:'[乒乓]',

			160:'[咖啡]',161:'[饭]',162:'[猪头]',163:'[玫瑰]',164:'[凋谢]',
			165:'[嘴唇]',166:'[爱心]',167:'[心碎]',168:'[蛋糕]',169:'[闪电]',
			170:'[炸弹]',171:'[刀]',172:'[足球]',173:'[瓢虫]',174:'[便便]',

			175:'[月亮]',176:'[太阳]',177:'[礼物]',178:'[拥抱]',179:'[强]',
			180:'[弱]',181:'[握手]',182:'[胜利]',183:'[抱拳]',184:'[勾引]',
			185:'[拳头]',186:'[差劲]',187:'[爱你]',188:'[NO]',189:'[OK]',

			190:'[爱情]',191:'[飞吻]',192:'[跳跳]',193:'[发抖]',194:'[怄火]',
			195:'[转圈]',196:'[磕头]',197:'[回头]',198:'[跳绳]',199:'[投降]',
		}

		this.emojiMapRev = this.swapJson(this.emojiMap);
	}

	swapJson(json){
	  var ret = {};
	  for(var key in json){
	    ret[json[key]] = key;
	  }
	  return ret;
	}
	getEmojiById (key) {
		return this.emojiMap[key];
	}

	getEmojiKeyByValue(value) {
		return this.emojiMapRev[value];
	}

	onEmojiClick(key) {
		let string = this.props.scriptString;
		let cursorPostion = this.refs.input.selectionStart;
		let preStr = string.substring(0,cursorPostion);
		let laterStr = string.substring(cursorPostion, string.length);
		let emoji = this.getEmojiById(key);
		this.props.onChange(`${preStr}${emoji}${laterStr}`);
	}

	onScriptChange(event) {
		 this.props.onChange(event.target.value);
	}
	onHandleMouseOut(event) {
		console.log(`cursorPostion = ${event.target.selectionStart}`);
		this.setState({cursorPostion: event.target.selectionStart});
	}

	replaceEm(str){
		// str = '123[微笑]234\n[微笑]456[微笑]\n6666[微笑]';
		str = str.replace(/\</g,'&lt;');
		str = str.replace(/\>/g,'&gt;');

		// var reg = new RegExp(/\[.{1,3}\]/g);
		// var reg = new RegExp(/\n/g);
		// let reslut = reg.exec(str);
		// console.log(reslut);
		// console.log(reslut[0]);
		// console.log(reslut.index);
		// console.log(reg.lastIndex);
		let list=[];
		// list.push(<span style={{display:'inline'}} >str</span>)
		// list.push(<img src="/images/emoji/1.gif" border="0"  style={{display:'inline'}}/>)
		// list.push(<span  style={{display:'inline'}}>fsfsefsefsef</span>)
		this.parseJSStringBr(list, str)
		// console.log(list);
		return list;
	}

	parseJSStringBr(list, str) {

		if(!str || str.length == 0) return ;

		var reg = new RegExp('\n','g');
		let reslut = reg.exec(str);
		// console.log(`parseJSStringBr ${reslut}`);
		if(reslut) {
			let preStr=str.substring(0, reslut.index);
			let lastStr=str.substring(reg.lastIndex, str.length);
			this.parseJSStringImg(list, preStr);
			list.push(<br key={this.keyIndex++} />)
			this.parseJSStringBr(list, lastStr);
		} else {
			this.parseJSStringImg(list, str);
		}
	}

	parseJSStringImg(list, str) {
		if(!str || str.length == 0) return ;
		var reg = new RegExp(/\[.{1,3}\]/g);
		let reslut = reg.exec(str);
		// console.log(`parseJSStringImg ${reslut}`);
		if(reslut) {
			let preStr=str.substring(0, reslut.index);
			let lastStr=str.substring(reg.lastIndex, str.length);
			this.parseJSStringImg(list, preStr);

			let key = this.getEmojiKeyByValue(reslut[0]);
			list.push(<img key={this.keyIndex++} src={`/images/${key}.gif`} style={{display:'inline'}}/>)
			this.parseJSStringImg(list, lastStr);
		} else {
			this.parseJSStringText(list, str);
		}
	}

	parseJSStringText(list, str) {
		if(!str || str.length == 0) return ;
		list.push(<span key={this.keyIndex++} style={{display:'inline'}}>{str}</span>)
	}

	render() {
		let that = this;
		var entries = [];
		// for (let i = 0; i < total/15; i++) {
		// 	let start = i*15+1;
		// 	let end = start+15;
		// 	entries.push(<EmojiRow key={'row'+i} imgs={_.range(start, end)}  onClick={this.onEmojiClick.bind(this)}/>)
		// }

		let tmpList=[];
		_.each(this.emojiMap, function (value, key) {
			tmpList.push(key);
			if(tmpList.length == 15) {
				entries.push(<EmojiRow key={'row'+key} imgs={tmpList}  onClick={that.onEmojiClick.bind(that)}/>)
				tmpList =[];
			}
		})
		if(tmpList.length > 0) {
			entries.push(<EmojiRow key={'row end'} imgs={tmpList}  onClick={that.onEmojiClick.bind(that)}/>)
			tmpList =[];
		}
		return(<div id="id" >
						<div>微信效果</div>
						{
							this.props.scriptString.length > 0 &&
							<div id="show"  ref='show' style = {{height: 60, width:800, border:'solid', borderWidth: 2,borderColor: '#666', borderRadius: 5}}>
								{
									this.replaceEm(this.props.scriptString)
								}
							</div>
						}
						<div>实际文本</div>
						<textarea ref="input"
									// onKeyDown={this.handleKeyDown.bind(this)}
                  onChange={this.onScriptChange.bind(this)}
                  value={this.props.scriptString}
									onClick={this.onHandleMouseOut.bind(this)}
									style = {{height: 60, width:800, borderWidth: 2,borderColor: '#666',
									borderRadius: 5}}/>

						<div onClick={()=>this.setState({show:!this.state.show})}>表情<img src={'/images/100.gif'} style={{display:'inline'}}/></div>
						{ this.state.show &&
							<table>
								<tbody>
									{
										entries
									}
								</tbody>
							</table>
						}
					</div>
		);
	}
}
