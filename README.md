# react-wechat-emoji

## 简介

使用react实现微信表情的表情输入，显示。目前输入和显示分开显示。

两种实现：

一、

通过textare获得文本，插入表情即插入文本如[微笑]，然后解析文本显示模拟带图片效果：

![image](https://github.com/xuyitao/react-wechat-emoji/blob/master/Screenshot/sample.png)

二、

通过div contentEditable 属性操作，插入表情即插入图片标签<img />，最后通过对html文本解析成微信文本。

![image](https://github.com/xuyitao/react-wechat-emoji/blob/master/Screenshot/sample1.png)

问题：点击时无法插入两个连续图片中间，只能通过按键操作。

## 表情对照表

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
    
## 启动
```
  npm install
  webpack
  npm run start
  http://localhost:3000
```

## 尾巴
  react初学，页面写的难看。凑活看吧
