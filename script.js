const url = './dictionary.pdf';

// Container where the PDF will be rendered

// Load the PDF

function showPdf(pdfData, cl) {
  let container = document.getElementById('pdf-container');
  container.innerHTML = '';
  pdfjsLib.getDocument({ data: atob(pdfData) }).promise.then((pdf) => {
    let pageNo = Math.floor(Math.random() * pdf._pdfInfo.numPages + 1);
    console.log('pageNo=>', pageNo);

    function it(i, j, cb) {
      if (i < j) {
        pdf.getPage(i + pageNo).then(function (page) {
          debugger;
          let canvas = document.createElement('canvas');
          let context = canvas.getContext('2d');
          container.appendChild(canvas);
          const viewport = page.getViewport({ scale: 1.5 });
          canvas.width = 1200;
          canvas.height = 900;
          page
            .render({ canvasContext: context, viewport: viewport })
            .promise.then((resp) => {
              context.strokeStyle = cl[i];
              console.log(i, '= ', cl[i]);
              context.strokeRect(rn(500), rn(500), rn(500), rn(500));
            });
        });
        i++;
        it(i, j, cb);
      } else {
        cb();
      }
    }

    it(0, 5, () => {
      console.log('DONE');
    });
  });
}

function rn(num) {
  return Math.floor(Math.random() * num + 1);
}
var _base64 = '';

$('#cng').click(function () {
  colorList = [
    '#ff7f50',
    '#87cefa',
    '#da70d6',
    '#32cd32',
    '#6495ed',
    '#ff69b4',
    '#ba55d3',
    '#cd5c5c',
    '#ffa500',
    '#40e0d0',
  ];
  showPdf(_base64, colorList);
});

$('#file').change(async (ev) => {
  debugger;
  _base64 = await getBase64(ev.target.files[0]);
  colorList = [
    '#ff7f50',
    '#87cefa',
    '#da70d6',
    '#32cd32',
    '#6495ed',
    '#ff69b4',
    '#ba55d3',
    '#cd5c5c',
    '#ffa500',
    '#40e0d0',
  ];
  showPdf(_base64, colorList);
});
function getBase64(pdfInput) {
  return new Promise((a, b) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      // The result is the file content as a Base64 string.
      debugger;
      const base64String = e.target.result.split(',')[1]; // Remove the prefix.
      a(base64String);
    };

    reader.onerror = function (error) {
      console.error('Error reading the file:', error);
      b(error);
    };

    // Read the file as a Data URL, which includes the Base64 string.
    reader.readAsDataURL(pdfInput);
  });
}
