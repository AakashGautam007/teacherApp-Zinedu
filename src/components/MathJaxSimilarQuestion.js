import React from "react";
import { View, StyleSheet } from "react-native";
import { width, height } from "../utils/config";
import AutoHeightWebView from "react-native-autoheight-webview";
import { typography } from "../appStyles";
import { getOptionName } from "../screens/question-verification/utils";

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

const wrapMathjax = (props) => {
  const { options, questionObject, currentQuestion } = props
  const [option1, option2, option3, option4] = options
  const mathJaxOptions = JSON.stringify(
    Object.assign({}, defaultOptions)
  );

  const style = `body {
    box-sizing: content-box;
    margin: 0px;
    padding: 0px 40px;
    width: calc(100vw - 1px);
  }

  .parent-container {
    // background-color: white;  }
  
  .container {
    background-color: white;
    border-radius: 8px;
    padding: 5px 10px;
  }
  
  .questionCard {
    background-color: #fff;
    border-radius: 10px;
  }
  
  .questionInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 5px;
  }

  .option-container {
    background-color: white; 
    border-radius: 8px;
    margin-top: 10px;
  }
  
  .heading {
    font-size: 16px;
    font-family: Montserrat-SemiBold;
    color: #595959;
    font-family: Montserrat;
    font-weight: 600;
  }

  .option-text-container {
    margin-top: 10px;
    border: 1px solid #bdbdbd; 
    border-radius: 8px;
    padding: 0px 10px;
    margin-bottom: 10px;
  }
  
  .questionText {
    font-size: 16px;
    color: #5b5b5b;
    overflow-x: auto;
  }
  
  .questionIdTextContainer {
    border-radius: 8px;
    background-color: #e7e7e7;
    align-items: center;
    justify-content: center;
    height: 15px;
    display: flex;
    padding: 2px 10px;
  }
  
  .questionIdText {
    color: #595959;
    font-size: 12px;
    font-family: Montserrat;
    font-weight: 500;
  }

  .verify-container {
    background-color: #FFDEBF; 
    display: flex; 
    justify-content: center;
    align-items: center;
    border-radius: 47px; 
    width: fit-content;
    padding: 2px 6px;
    margin-top: 6px;
    height: 22px;
  }

  .verify-text {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
  }

  .option-name {
    color: #000000;
    font-size: 16px;
    margin-top: 8px;
    font-family: Montserrat;
    font-weight: 500;
  }
  `

  const head = `<head>
  <meta charset="utf-8"/>
  <link
href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
rel="stylesheet"
type="text/css"
/>
  <script>
  MathJax = {
    ${mathJaxOptions}
  };
  </script>
  <script id="MathJax-script"
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/mml-svg.js">
  </script>
  <style>
    ${style}
  </style>
</head>`


  // if its type 3(Fill ups)
  if (questionObject?.question_type == 3) {
    const body = `<div class="parent-container">
    <div style="padding: 10px; border: 1px solid #bdbdbd; border-radius: 8px;">
    <div>
    <div class="container">
      <div class="questionCard">
        <div class="questionInfo">
          <div>
          <div class="heading">Question</div>
          </div>

          <div class="questionIdTextContainer">
            <div class="questionIdText">QID ${questionObject?.question_id}</div>
          </div>
        </div>
      </div>

      <div class="verify-container">
        <div class="verify-text">
          To be verified
        </div>
      </div>

      <div class='questionText'>
        ${questionObject?.question}
      </div>
    </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: 0px;">
            <div class="verify-text">
              Similar Question
            </div>
          </div>

          <div class="questionIdTextContainer">
            <div class="questionIdText">QID ${currentQuestion?.question_id}</div>
          </div>
        </div>
      </div>

      <div class='questionText'>
        ${currentQuestion?.question}
      </div>
    </div>
    </div>
    </div>

    <div class="option-container">
      <div class="container">
        <div class="questionCard">
          <div class="option-name">
            Correct Answer
          </div>
        </div>

        <div class="verify-container">
          <div class="verify-text">
            To be verified
          </div>
        </div>

        <div class="option-text-container">
          <div class='questionText'>
            ${option1?.prevQuestionHtml}
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: -20px;">
            <div class="verify-text">
              Similar Question
            </div>
        </div>
      </div>

      <div class="option-text-container">
        <div class='questionText'>
          ${option1?.html}
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>`

    return `<!DOCTYPE html>
			<html lang="en-US">
			${head}
			<body>
      ${body}
			</body>
			</html>
		`;
  } else {
    const body = `<div class="parent-container">
    <div style="padding: 10px; border: 1px solid #bdbdbd; border-radius: 8px;">
    <div>
    <div class="container">
      <div class="questionCard">
        <div class="questionInfo">
          <div>
          <div class="heading">Question</div>
          </div>

          <div class="questionIdTextContainer">
            <div class="questionIdText">QID ${questionObject?.question_id}</div>
          </div>
        </div>
      </div>

      <div class="verify-container">
        <div class="verify-text">
          To be verified
        </div>
      </div>

      <div class='questionText'>
        ${questionObject?.question}
      </div>
    </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: 0px;">
            <div class="verify-text">
              Similar Question
            </div>
          </div>

          <div class="questionIdTextContainer">
            <div class="questionIdText">QID ${currentQuestion?.question_id}</div>
          </div>
        </div>
      </div>

      <div class='questionText'>
        ${currentQuestion?.question}
      </div>
    </div>
    </div>
    </div>

    <div class="option-container">
      <div class="container">
        <div class="questionCard">
          <div class="option-name">
            ${getOptionName(0)}
          </div>
        </div>

        <div class="verify-container">
          <div class="verify-text">
            To be verified
          </div>
        </div>

        <div class="option-text-container">
          <div class='questionText'>
            ${option1?.prevQuestionHtml}
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: -20px;">
            <div class="verify-text">
              Similar Question
            </div>
        </div>
      </div>

      <div class="option-text-container">
        <div class='questionText'>
          ${option1?.html}
        </div>
      </div>
    </div>
    </div>
    </div>

    

    <div class="option-container">
      <div class="container">
        <div class="questionCard">
          <div class="option-name">
            ${getOptionName(1)}
          </div>
        </div>

        <div class="verify-container">
          <div class="verify-text">
            To be verified
          </div>
        </div>

        <div class="option-text-container">
          <div class='questionText'>
            ${option2?.prevQuestionHtml}
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: -20px;">
            <div class="verify-text">
              Similar Question
            </div>
        </div>
      </div>

      <div class="option-text-container">
        <div class='questionText'>
          ${option2?.html}
        </div>
      </div>
    </div>
    </div>
    </div>



    <div class="option-container">
      <div class="container">
        <div class="questionCard">
          <div class="option-name">
            ${getOptionName(2)}
          </div>
        </div>

        <div class="verify-container">
          <div class="verify-text">
            To be verified
          </div>
        </div>

        <div class="option-text-container">
          <div class='questionText'>
            ${option3?.prevQuestionHtml}
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: -20px;">
            <div class="verify-text">
              Similar Question
            </div>
        </div>
      </div>

      <div class="option-text-container">
        <div class='questionText'>
          ${option3?.html}
        </div>
      </div>
    </div>
    </div>
    </div>



    <div class="option-container">
      <div class="container">
        <div class="questionCard">
          <div class="option-name">
            ${getOptionName(3)}
          </div>
        </div>

        <div class="verify-container">
          <div class="verify-text">
            To be verified
          </div>
        </div>

        <div class="option-text-container">
          <div class='questionText'>
            ${option4?.prevQuestionHtml}
          </div>
        </div>
      </div>

    <div class="container" style="margin-top: 10px;">
      <div class="questionCard">
        <div class="questionInfo">
          <div class="verify-container" style="background-color: #E8E8E8; margin-top: -20px;">
            <div class="verify-text">
              Similar Question
            </div>
        </div>
      </div>

      <div class="option-text-container">
        <div class='questionText'>
          ${option4?.html}
        </div>
      </div>
    </div>
    </div>
    </div>

  </div>`

    return `<!DOCTYPE html>
    <html lang="en-US">
    ${head}
    <body>
    ${body}
    </body>
    </html>
  `;
  }
}

const MathJaxSimilarQuestion = (props) => {
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
      // pointerEvents="none"
    >
      {html ? <AutoHeightWebView
      // pointerEvents="none"
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

export default MathJaxSimilarQuestion;