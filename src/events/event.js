export default [
  {
    name: "SHOW_MESSAGE",
    callback: function(params) {
      // this.$toasted.show(params.text);
      this.snackbar = {
        show: true,
        color: "green",
        text: params.text
      };
    }
  },
  {
    name: "SHOW_ERROR",
    callback: function(params) {
      // this.$toasted.show(params.text);
      this.snackbar = {
        show: true,
        color: "red",
        text: params.text
      };
    }
  },
  {
    name: "LOADING",
    callback: function(flag) {
      this.$loading(flag);
    }
  }
];
