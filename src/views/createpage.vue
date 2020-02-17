<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 style="color:red;">
          <b>Create Post</b>
        </h1>
        <form @submit.prevent="submit">
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

            <label>About</label>
            <textarea
              cols="10"
              rows="10"
              placeholder="klmlmlm"
              class="mt-3"
              v-model="postDetails.aboutField"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-secondary mt-3 mr-3"><span v-if="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Create post</button>
        </form>
      </div>

      <div class="col-md-6 mt-3" style="text-align:center;">
        <h1>Post Preview</h1>
        <div class="card-deck">
          <div class="card">
            <img src class="card-img-top" alt />
            <div class="card-body">
              <img src alt />
              <h5 class="card-image">{{postDetails.imageField}}</h5>

              <h5 class="card-title">{{postDetails.captionField}}</h5>

              <p class="card-text">{{postDetails.aboutField}}</p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


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
      isLoading : false,
      postContent: []
    };
  },

  methods: {
    handleListener() {
      this.postDetails.imageField = this.$refs.file.files[0];
      console.log(this.postDetails.imageField);
    },
    create() {
      this.postContent.push(this.postDetails);
      this.postDetails = {};
    },

    // remove(index){
    //   this.lists.splice(index,1)
    // },
    submit() {
      this.isLoading = true;
      axios
        .post(
          "https://blog-project-72d41.firebaseio.com/users.json",
          this.postDetails
        )
        .then(res=> {
                this.isLoading = false;

          console.log(res);
          this.postDetails = {}
          alert("post add");
        })
        .catch(error=> {
          console.log(error);
          alert("Something Failed")
           this.isLoading = false;
        });
    }
  }
};
</script>

