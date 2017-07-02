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
		this.sel = null;
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

	insertHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
				if(this.sel) {
					sel = this.sel;
				} else {
        	sel = window.getSelection();
				}
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);
            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
  }

	onEmojiClick(key) {
		this.refs.input.focus();
		let emoji = `<img src="/images/${key}.gif" />`;
		this.insertHtmlAtCaret(emoji);

		this.onScriptChange();
	}

	onScriptChange(html) {
		var html = this.refs.input.innerHTML;
		 this.props.onChange(html);
	}
	onHandleMouseOut(event) {

	}

	replaceEm(str){
		// str = '123[微笑]234\n[微笑]456[微笑]\n6666[微笑]';
		// str = str.replace(/\<img src="\/images\//g,'[');
		// str = str.replace(/.gif"\>/g,']');
		// str = str.replace(/\<img src="\/images\/d{3}.gif"\>/g,'[$1]');
		// console.log('str='+str);
		// var reg = new RegExp(/\<img src="\/images\/\d{3}.gif"\>/g);
		// var reg = new RegExp(/\d{3}/g);
		// let reslut = reg.exec(str);
		// console.log(reslut);
		// console.log(reslut[0]);
		// console.log(reslut.index);
		// console.log(reg.lastIndex);

		return this.parseJSStringImg(str);
	}


	parseJSStringImg(str) {
		if(!str || str.length == 0) return str;
		var reg = new RegExp(/\<img src="\/images\/\d{3}.gif"\>/g);
		let result = reg.exec(str);
		// console.log(`parseJSStringImg ${result}`);
		if(result) {
			let strImg = result[0];

			let regImg = new RegExp(/\d{3}/g);
			let reslutImg = regImg.exec(str);
			// console.log(`parseJSStringImg reslutImg = ${reslutImg}`);
			if(reslutImg) {
				let emoji = this.getEmojiById(reslutImg[0]);
				// console.log(`parseJSStringImg emoji = ${emoji}`);
				str = str.replace(strImg, emoji);
				// console.log(`parseJSStringImg str = ${str}`);
			}
			return this.parseJSStringImg(str);
		} else {
			return str;
		}
	}


	emitChange(evt) {
		console.log();

		this.onScriptChange();
  }

	onLoseFocus() {
		if (window.getSelection) {
			this.sel = window.getSelection();
		}
	}
	render() {
		let that = this;
		var entries = [];

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
						<div>微信文本</div>
						{
							this.props.scriptString.length > 0 &&
							<div id="show"  ref='show' style = {{height: 60, width:800, border:'solid', borderWidth: 2,borderColor: '#666', borderRadius: 5}}>
								{
									this.replaceEm(this.props.scriptString)
								}
							</div>
						}
						<div>编辑文本</div>
						<div ref='input'
	            onInput={this.emitChange.bind(this)}
	            onBlur={this.onLoseFocus.bind(this)}
	            contentEditable
	            dangerouslySetInnerHTML={{__html: this.props.html}}
							style = {{height: 60, width:800, borderWidth: 2,borderColor: '#666',
							borderRadius: 5, border:'solid'}}>
						</div>
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
