## 读取 pdf，转换为图片
```html
<template>
  <div class="print-container">
    <div ref="printRef" class="pdf_viewer_container">
      <img v-for="item in imgs" :key="item" :src="item" alt="" srcset="">
    </div>
  </div>
</template>

<script setup>
import html2canvas from 'html2canvas';
import config from '@/environment';
import { showLoadingToast, closeToast, showToast } from 'vant';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const printRef = ref(null);
const imgs = ref([]);
const error = ref(false);
const complete = ref(false);

const loadingTaskPdf = async (url) => {
  console.log('loadingTaskPdf');
  if (!window.pdfjsLib) {
    try {
      await hc.utils.loadJs(`${window.location.origin}${config.base}pdfjs/pdf.js`);
    } catch (e) {
      console.log(e);
      error.value = true;
      return;
    }
  }
  const PdfJs = window.pdfjsLib;
  PdfJs.GlobalWorkerOptions.workerSrc = `${window.location.origin}${config.base}pdfjs/pdf.worker.js`;

  // PdfJs.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;

  // const loadingTask = PdfJs.getDocument(url);
  const loadingTask = PdfJs.getDocument({
    url,
    cMapUrl: `${window.location.origin}${config.base}pdfjs/cmaps/`,
    cMapPacked: true,
    disableWorker: true,
  });

  loadingTask.promise.then((pdf) => {
    const pages = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= pdf.numPages; i++) {
      pages.push(i);
    }
    return Promise.all(pages.map((pageNum) => pdf.getPage(pageNum).then((page) => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };
      return page.render(renderContext).promise.then(() => canvas.toDataURL());
    })));
  }).then((images) => {
  // images is an array of base64-encoded strings
    console.log('images');
    imgs.value = images;
    complete.value = true;
  }).catch((e) => {
    console.log(e);
    error.value = true;
  });
};

const nativePrint = (base64) => {
  let baseUrl = base64;
  if (base64.startsWith('data:')) {
    const baseArr = base64.split(';base64,');
    // eslint-disable-next-line prefer-destructuring
    baseUrl = baseArr[1];
  }
  console.log('PRINT_A4');
  console.log(baseUrl);
};

onMounted(() => {
  const url = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
  loadingTaskPdf(url);
});

const print = () => {
  if (error.value) {
    showToast({
      message: '打印异常，请重试',
      forbidClick: true,
    });
    return;
  }
  if (!complete.value) {
    showLoadingToast({
      message: '打印中请稍后',
      forbidClick: true,
    });
    setTimeout(() => {
      print();
    }, 500);
    return;
  }
  closeToast();
  showLoadingToast({
    message: '打印中请稍后',
    forbidClick: true,
    duration: 0,
  });
  html2canvas(printRef.value, {
    useCORS: true,
    allowTaint: true,
  }).then((canvas) => {
    closeToast();
    const url = canvas.toDataURL();
    console.log('drawImg');
    nativePrint(url);
  });
  
};

defineExpose({
  print,
});
</script>

<style lang="scss">
/* 隐藏元素，但是能使用 html2canvas */
.print-container {
  position: fixed;
  opacity: 0;
}
.pdf_viewer_container {
  position: relative;
  background-color: #525659;
  img {
    display: block;
    width: 100% !important;
    // margin-bottom: 1px;
  }
}
</style>

```

## 渲染 pdf
```html
<template>
  <div class="pdf_viewer_container">
    <template v-for="item in pageNum" :key="item">
      <canvas :id="`pdf-canvas-${item}`" />
    </template>
  </div>
</template>

<script setup>
import config from '@/environment';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
});

const pageNum = ref(0);
const error = ref(false);
const complete = ref(false);
// const PDF_TO_CSS_UNITS = 96.0 / 72.0;

const renderPdf = (pdfCtx, num = 1) => {
  pdfCtx.getPage(num).then((page) => {
    const canvasId = `pdf-canvas-${num}`;
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const bsr = ctx.webkitBackingStorePixelRatio
                || ctx.mozBackingStorePixelRatio
                || ctx.msBackingStorePixelRatio
                || ctx.oBackingStorePixelRatio
                || ctx.backingStorePixelRatio
                || 1;
    const ratio = dpr / bsr;
    const originalViewport = page.getViewport({ scale: 1 });
    const scale = 2000 / originalViewport.width;
    const viewport = page.getViewport({ scale });

    canvas.width = viewport.width * ratio;
    canvas.height = viewport.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const renderContext = {
      canvasContext: ctx,
      viewport,
    };
    page.render(renderContext);

    if (num < pageNum.value) {
      nextTick(() => {
        renderPdf(pdfCtx, num + 1);
      });
    } else {
      complete.value = true;
    }
  }).catch((e) => {
    console.log(e);
    error.value = true;
  });
};

const loadingTaskPdf = async (url) => {
  if (!window.pdfjsLib) {
    try {
      await hc.utils.loadJs(`${window.location.origin}${config.base}pdfjs/pdf.min.js`);
    } catch (e) {
      console.log(e);
      error.value = true;
      return;
    }
  }

  const PdfJs = window.pdfjsLib;
  PdfJs.GlobalWorkerOptions.workerSrc = `${window.location.origin}${config.base}pdfjs/pdf.worker.min.js`;

  // PdfJs.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;

  // const loadingTask = PdfJs.getDocument(url);
  const loadingTask = PdfJs.getDocument({
    url,
    cMapUrl: `${window.location.origin}${config.base}pdfjs/cmaps/`,
    cMapPacked: true,
    disableWorker: true,
  });

  hc.loading.show();
  loadingTask.promise.then((pdf) => {
    pageNum.value = pdf.numPages;

    hc.loading.hide();
    nextTick(() => {
      renderPdf(pdf, 1);
    });
  }).catch((e) => {
    console.log(e);
    error.value = true;
    hc.loading.hide();
  });
};

onMounted(() => {
  if (props.url) {
    loadingTaskPdf(props.url);
  }
});

defineExpose({ error, complete });
</script>

<style lang="scss">
.pdf_viewer_container {
  position: relative;
  background-color: #525659;
  canvas {
    width: 100% !important;
    margin-bottom: 1px;
  }
}
</style>

```