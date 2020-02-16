<template>
  <section id="backcolor">
    <div class>
      <div class>
        <div style="padding-bottom:5rem">
          <h1 style="color:white; text-align:center; padding-top:50px; padding-bottom:10rem">
            Welcome to Amaka Ibiam's blog
            <i>
              <sub style="font-size:15px">so much more to read</sub>
            </i>
          </h1>
          <div style="background-color:black; text-align:center; " v-if="nav">
            <hr />

            <button type="submit" class="btn btn-secondary" style="margin: 2rem" @click="home">Home</button>
            ||
            <button
              type="submit"
              class="btn btn-secondary"
              style="margin: 2rem"
              @click="news"
            >News</button>

            <hr />
          </div>
        </div>

        <div class="container">
          <div class="col-md-6" v-if="form">
            <h1 style="color:white;">
              <b>Update Post</b>
            </h1>
            <form>
              <div
                class="card shadow p-5"
                style="background-color:black; color: white; margin-top: 20px "
              >
                <div class="form-grp">
                  <label>
                    <b>Caption</b>
                  </label>
                  <input
                    type="text"
                    name
                    id
                    class="form-control"
                    placeholder="make my hair"
                    v-model="postDetails.captionField"
                  />
                </div>
                <br />

                <label>
                  <b>About</b>
                </label>
                <textarea
                  cols="10"
                  rows="10"
                  placeholder="klmlmlm"
                  class="mt-3"
                  v-model="postDetails.aboutField"
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-secondary mt-3 mr-3"
                @click="update(postDetails.id)"
              >Update</button>
            </form>
          </div>

          <center>
            <div v-if="cards">
              <div
                class="card mt-4"
                style="width: 30rem;"
                v-for="(post, index) in blogsArray"
                :key="index"
              >
                <img src class="card-img-top" alt />
                <div class="card-body">
                  <h1 class="card-title">{{post.captionField}}</h1>
                  <p class="card-text">{{post.aboutField}}</p>
                  <div>
                    <button
                      type="button"
                      class="btn btn-secondary mt-5 mr-3"
                      @click="remove(post.id)"
                    >
                      <span
                        v-if="loading"
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Remove
                    </button>
                    <button type="button" class="btn btn-secondary mt-5" @click="edit(post)">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#backcolor {
  background: purple;
}
</style>


<script>
import axios from "axios";
export default {
  data() {
    return {
      postDetails: {
        captionField: "",
        imageField: "",
        aboutField: ""
      },
      loading: false,
      nav: true,
      form: false,
      cards: false,
      blogsArray: []
    };
  },
  created() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      axios
        .get("https://blog-project-72d41.firebaseio.com/users.json")
        .then(res => {
          const data = res.data;
          for (let key in data) {
            const post = data[key];
            post.id = key;
            this.blogsArray.unshift(post);
            console.log(res);
            // console.log(data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    home() {
      // this.cards = !this.cards;
      this.nav = true;
      this.cards = false;
    },

    news() {
      this.cards = true;
    },

    reload() {
      var timeout = setTimeout("location.reload(true);", 1000);
      function resetTimeout() {
        clearTimeout(timeout);
        timeout = setTimeout("location.reload(true", 1000);
      }
    },
    remove(i) {
      this.loading = true;
      axios
        .delete(`https://blog-project-72d41.firebaseio.com/users/${i}.json`)
        .then(res => {
          alert("Deleted");
          this.loading = false;
          this.getAllPosts();
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },

    edit(id) {
      this.form = true;
      this.postDetails = id;
      this.cards = false;
    },

    update(i) {
      axios
        .put(
          `https://blog-project-72d41.firebaseio.com/users/${i}.json`,
          this.postDetails
        )
        .then(
          function(res) {
            console.log(res);
          },
          function(error) {
            console.log(error);
          }
        );
      this.reload();
      this.twoBtn = false;
      this.oneBtn = true;
      this.form = false;
    }
  }
};
</script>