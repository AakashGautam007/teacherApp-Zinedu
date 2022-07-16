import React from "react";
import { View } from "react-native";
import { width, height } from "../utils/config";
import AutoHeightWebView from "react-native-autoheight-webview";

const defaultOptions = {
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
    packages: ["base", "ams", "noerrors", "noundefined"],
  },
  chtml: {
    scale: 1, // global scaling factor for all expressions
    minScale: 1, // smallest scaling factor to use
    mtextInheritFont: false, // true to make mtext elements use surrounding font
    merrorInheritFont: false, // true to make merror text use surrounding font
    mtextFont: "", // font to use for mtext, if not inheriting (empty means use MathJax fonts)
    merrorFont: "serif", // font to use for merror, if not inheriting (empty means use MathJax fonts)
    unknownFamily: "serif", // font to use for character that aren't in MathJax's fonts
    mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
    skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
    exFactor: 0.5, // default size of ex in em units
    displayAlign: "center", // default for indentalign when set to 'auto'
    displayIndent: "0", // default for indentshift when set to 'auto'
  },
};

// class MathJax extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       height: 1,
//     };
//   }

//   handleMessage(message) {
//     this.setState({
//       height: Number(message.nativeEvent.data),
//     });
//   }

//   wrapMathjax(content) {
//     const options = JSON.stringify(
//       Object.assign({}, defaultOptions, this.props.mathJaxOptions)
//     );

//     return `<!DOCTYPE html>
// 			<html lang="en-US">
// 			<head>
// 				<meta charset="utf-8"/>
// 				<script>
// 				MathJax = {
// 					${options}
// 				};
// 				</script>
// 				<script id="MathJax-script"
// 					src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-chtml.js">
// 				</script>
// 			</head>

// 			<body>
// 				<div id="formula">
// 				${content}
// 				</div>
// 			</body>
// 			</html>
// 		`;
//   }


//   render() {
//     const html = this.wrapMathjax(this.props.html);

//     // Create new props without `props.html` field. Since it's deprecated.
//     const props = Object.assign({}, this.props, { html: undefined });

//     return (
//       <View
//         style={{
//           ...props.style,
//           width: width,
//         }}
//       >
//         <AutoHeightWebView
//           style={{
//             opacity: 0.99,
//             minHeight: 1,
//             ...props.width,
//           }}
//           source={{
//             html: html,
//           }}
//           javaScriptEnabled
//           scrollEnabled
//           customScript={`document.body.style.userSelect = 'none'`}
//           showsHorizontalScrollIndicator={true}
//           // showsVerticalScrollIndicator={true}
//           persistentScrollbar={true}
//           automaticallyAdjustsScrollIndicatorInsets
//           {...props}
//         />

//         {/* <WebView
//           scrollEnabled={false}
//           onMessage={this.handleMessage.bind(this)}
//           source={{ html }}
//           {...props}
//         /> */}
//       </View>
//     );
//   }
// }

// export default MathJax;


const wrapMathjax = (props) => {
  const { content, mathJaxOptions, answer1, answer2, answer3, answer4 } = props
  const options = JSON.stringify(
    Object.assign({}, defaultOptions, mathJaxOptions)
  );

  // return `<!DOCTYPE html>
  // 		<html lang="en-US">
  // 		<head>
  // 			<meta charset="utf-8"/>
  // 			<script>
  // 			MathJax = {
  // 				${options}
  // 			};
  // 			</script>
  // 			<script id="MathJax-script"
  // 				src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-chtml.js">
  // 			</script>
  // 		</head>

  // 		<body>
  // 			<div id="formula">
  //       <div>
  //       ${answer1}
  //       </div>
  //        <div>
  //       ${answer2}
  //       </div>
  //        <div>
  //       ${answer3}
  //       </div>
  //        <div>
  //       ${answer4}
  //       </div>
  // 			</div>
  // 		</body>
  // 		</html>
  // 	`;

  return `<!DOCTYPE html>
			<html lang="en-US">
			<head>
				<meta charset="utf-8"/>
				<script>
				MathJax = {
					${options}
				};
				</script>
				<script id="MathJax-script"
					src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-chtml.js">
				</script>
			</head>
     
			<body>
				<div id="formula">
				${content}
				</div>
			</body>
			</html>
		`;
}

const MathJax = (props) => {
  // console.log('MathJax',{props})
  const html = wrapMathjax(props);
  // console.log({ html })
  return (
      <View
        style={{
          opacity: 0.99,
          minHeight: 1,
          // width: width * 0.75,
          width: '100%',
          alignItems: "center",
          alignSelf: "center",
          // ...props.style,
          width: width,
        }}
      >
        {html ? <AutoHeightWebView
          style={{
            opacity: 0.99,
            minHeight: 1,
            width: width * 0.75,
            // width: '100%',
            alignItems: "center",
            alignSelf: "center",
            ...props.width,
          }}
          source={{
            html: html,
          }}
          javaScriptEnabled
          scrollEnabled
          customScript={`document.body.style.userSelect = 'none'`}
          showsHorizontalScrollIndicator={true}
          // showsVerticalScrollIndicator={true}
          persistentScrollbar={true}
          automaticallyAdjustsScrollIndicatorInsets
          {...props}
        /> : null}

      </View>
  );
}

export default MathJax;