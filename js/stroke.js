fabric.Object.prototype.set({
    borderColor: 'red',
    cornerColor: 'blue', 
    cornerSize: 12,     
    cornerStyle: 'circle' ,
});


canvas.selection = true // 画布是否可选中。默认true；false 不可选中
canvas.selectionColor = 'rgba(106, 101, 216, 0.3)' // 画布鼠标框选时的背景色
canvas.selectionBorderColor = "#1d2786" // 画布鼠标框选时的边框颜色
canvas.selectionLineWidth = 4 // 画布鼠标框选时的边框厚度
canvas.selectionDashArray = [30, 4, 10] // 画布鼠标框选时边框虚线规则
canvas.selectionFullyContained = true // 只选择完全包含在拖动选择矩形中的形状
