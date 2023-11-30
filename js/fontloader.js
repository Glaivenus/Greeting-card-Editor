WebFont.load({
    google: {
      families: ['Ephesis', 'Ma Shan Zheng'] 
    },
    custom: {
      families: ['Ephesis','Ma Shan Zheng'], 
      urls: ['../css/font.css'] 
    },
    active: function() {
        setTimeout(function() {
            canvas.renderAll();
        }, 100); 
    }
  });
  