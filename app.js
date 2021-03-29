var app = new Vue({
  el: '#app',
  data: {
    mode: 'list',
    memo: {
      id: null,
      content: null,
      regDate: null,
    },
    memos: []
  },
  methods: {
    write: function() {
      this.mode = 'write';
      this.memo = {
        id: null,
        content: null,
        regDate: null
      }
    },
    save: function() {
      if(this.mode === "write") {
        this.memos.push({
          id: this.memos.length,
          content: this.memo.content,
          regDate: new Date(),
        })
        localStorage.setItem('MEMO', JSON.stringify(this.memos));
        this.cancel()
      } else if(this.mode === 'modify') {
        this.memos[this.memo.id] = this.memo;
        localStorage.setItem('MEMO', JSON.stringify(this.memos));
        this.cancel();
      }
    },
    cancel: function() {
      this.mode = 'list';
    },
    modify: function(index) {
      this.write();
      this.mode = 'modify';
      this.memo = this.memos[index];
    },
    deleteList: function(index) {
      this.memos.splice(index, 1);
      for(let i = index; i < this.memos.length; i++) {
        this.memos[i].id--;
      }
    }
  },
  created: function() {
    let memos = localStorage.getItem('MEMO');

    if(memos) {
      this.memos = JSON.parse(memos);
    }
  }
})