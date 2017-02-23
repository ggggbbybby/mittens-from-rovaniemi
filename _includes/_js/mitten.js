class Mitten {
  constructor(size) {
    this.size = size;
    this.colors = {
      A: "ivory",
      B: "blue",
      C: "orangered",
      D: "green"
    };

    this.chart = $('<div class="mitten"></div>');
  }

  draw() {
    this.rows = this.color_chart.split("\n").filter(Boolean);
    this.overlay = this.stitch_chart.split("\n").filter(Boolean);
    $.each(this.rows, this.appendNewRow.bind(this));

    $('.mitten').replaceWith(this.chart);

    $.each(this.colors, function(key, value) {
      $(`input#color-${key}`).val(value);
    });
  }

  recolor(e) {
    var colorKey = e.target.dataset.colorKey;
    this.colors[colorKey] = e.target.value;
    $(`.mitten .col[data-color-key=${colorKey}]`).css('background-color', e.target.value);
  }

  appendNewRow(rowIdx, row) {
    var newRow = $(`<div class="row" style="height:${this.size}"></div>`);
    var cols = row.trim().split("");
    $.each(cols, function(colIdx, colorKey) {
      var overlay = this.overlay[rowIdx][colIdx] || " ";
      newRow.append(this.newCol(colorKey, overlay));
    }.bind(this));
    this.chart.append(newRow);
  }

  newCol(colorKey, overlay) {
    return $(`
        <div class="col" 
             data-color-key="${colorKey}" 
             style="width:${this.size};
                    height:${this.size};
                    background-color:${this.colors[colorKey]};">
        ${overlay}
        </div>
    `);
  }
}