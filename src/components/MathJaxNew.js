import React from "react";
import { View, StyleSheet } from "react-native";
import { width, height } from "../utils/config";
import AutoHeightWebView from "react-native-autoheight-webview";
import { typography } from "../appStyles";

// const defaultOptions = {
//   tex: {
//     inlineMath: [
//       ["$", "$"],
//       ["\\(", "\\)"],
//     ],
//     displayMath: [
//       ["$$", "$$"],
//       ["\\[", "\\]"],
//     ],
//     processEscapes: true,
//     packages: ["base", "ams", "noerrors", "noundefined"],
//   },
//   chtml: {
//     scale: 1, // global scaling factor for all expressions
//     minScale: 1, // smallest scaling factor to use
//     mtextInheritFont: false, // true to make mtext elements use surrounding font
//     merrorInheritFont: false, // true to make merror text use surrounding font
//     mtextFont: "", // font to use for mtext, if not inheriting (empty means use MathJax fonts)
//     merrorFont: "serif", // font to use for merror, if not inheriting (empty means use MathJax fonts)
//     unknownFamily: "serif", // font to use for character that aren't in MathJax's fonts
//     mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
//     skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
//     exFactor: 0.5, // default size of ex in em units
//     displayAlign: "center", // default for indentalign when set to 'auto'
//     displayIndent: "0", // default for indentshift when set to 'auto'
//   },
// };

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

const defaultOptions = {
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    displayMath: [
      ['$$', '$$'],
      ['\\[', '\\]'],
    ],
    processEscapes: true,
    packages: ['base', 'ams', 'noerrors', 'noundefined']
  },
  loader: {
    load: ["input/mml", 'output/svg']
  },
  chtml: {
    scale: 1,                      // global scaling factor for all expressions
    minScale: 1,                  // smallest scaling factor to use
    mtextInheritFont: false,       // true to make mtext elements use surrounding font
    merrorInheritFont: false,      // true to make merror text use surrounding font
    mtextFont: '',                 // font to use for mtext, if not inheriting (empty means use MathJax fonts)
    merrorFont: 'serif',           // font to use for merror, if not inheriting (empty means use MathJax fonts)
    unknownFamily: 'serif',        // font to use for character that aren't in MathJax's fonts
    mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
    skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
    exFactor: .5,                  // default size of ex in em units
    displayAlign: 'center',        // default for indentalign when set to 'auto'
    displayIndent: '0'             // default for indentshift when set to 'auto'
  },
  svg: {
    scale: 1,                      // global scaling factor for all expressions
    minScale: .5,                  // smallest scaling factor to use
    mtextInheritFont: false,       // true to make mtext elements use surrounding font
    merrorInheritFont: true,       // true to make merror text use surrounding font
    mathmlSpacing: true,          // true for MathML spacing rules, false for TeX rules
    skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
    exFactor: .5,                  // default size of ex in em units
    displayAlign: 'center',        // default for indentalign when set to 'auto'
    displayIndent: '0',            // default for indentshift when set to 'auto'
    fontCache: 'local',            // or 'global' or 'none'
    localID: null,                 // ID to use for local font cache (for single equation processing)
    internalSpeechTitles: true,    // insert <title> tags with speech content
    titleID: 0                     // initial id number to use for aria-labeledby titles
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    paddingBottom: 20,
    marginVertical: 10
  },
  heading: {
    fontSize: 16,
    fontFamily: typography.montserrat_500,
    color: '#595959'
  },
  tag: {
    marginVertical: 10
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    paddingBottom: 10,
    paddingHorizontal: 5,
    marginTop: 10
  },
  questionText: {
    color: '#5B5B5B',
    fontSize: 16
  },
  answerText: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 8,
    padding: 12,
    paddingHorizontal: 20
  },
})

const CheckQuestionOption = ({ item, index }) => {
  const { html, selected, isFillUps } = item

  return `<div id="formula">
    Option ${index}
    ${html}
  </div>`
  return <View style={[styles.container, selected ? { backgroundColor: '#E3FFDA', borderWidth: 1, borderColor: '#2EB100' } : {}]}>
    <Text style={styles.heading}>{isFillUps ? 'Correct Answer' : getOptionName(index)}</Text>

    <View style={styles.borderContainer}>
      <View style={{
        width: width * 0.8
      }}>
        <MathJax
          content={html}
        />
      </View>
    </View>

  </View>
}

const wrapMathjax = (props) => {
  const { question, options, solution } = props
  const mathJaxOptions = JSON.stringify(
    Object.assign({}, defaultOptions)
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
					${mathJaxOptions}
				};
				</script>
				<script id="MathJax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-svg.js">
				</script>
        <style>

.container {
  background-color: white;
        // padding: 10;
        // border-radius: 8;
  width: 100%;
}
.questionContainer {
  display: flex;
  flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-family: Montserrat-SemiBold;
        background-color: white;
}
.heading {
  font-size: 16px;
        font-family: Montserrat-SemiBold;
        color: #595959;
}
.questionIdTextContainer {
  border-radius: 10px;
  background-color: #E7E7E7;
  // padding: 0px 10px;
  align-items: center;
  justify-content: center;
  // line-height: 0.7;
  height: 30px;
  display: flex;
}
.questionIdText {
  color: #595959;
}
        </style>
			</head>
     
			<body>
				<div class="container">
          <div class="questionContainer">
            <div>
              <p class="heading">Question 1 </p>
            </div>

            <div class="questionIdTextContainer">
              <div class="questionIdText">QID 12345</div>
            </div>
				  </div>

          <div>
            ${question}
          </div>
        </div>
        <div>
        <div id="formula">
          Option 1
          ${options[0]?.html}
        </div>

        <div id="formula">
          Option 2
          ${options[1]?.html}
        </div>

        <div id="formula">
          Option 3
          ${options[2]?.html}
        </div>

        <div id="formula">
          Option 4
          ${options[3]?.html}
        </div>

        <div id="formula">
          solution
          ${solution}
        </div>
			</body>
			</html>
		`;
}

const MathJaxNew = (props) => {
  // console.log('MathJax',{props})
  const html = wrapMathjax(props);
  // console.log({ html })
  return (
    <View
      style={{
        opacity: 0.99,
        minHeight: 1,
        // width: width * 0.75,
        // width: '100%',
        alignItems: "center",
        alignSelf: "center",
        // ...props.style,
        width: width,
        // backgroundColor: 'white'
      }}
    >
      {html ? <AutoHeightWebView
        style={{
          opacity: 0.99,
          minHeight: 1,
          width: width * 0.9,
          alignItems: "center",
          alignSelf: "center",
          // marginHorizontal: 10
          // ...props.width,
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

export default MathJaxNew;