<template>
  <div>
    <div v-if="photoDetails">
      <div :class="['photo-container']" @click="openModal()">
        <img
          :src="photoDetails.urls ? photoDetails.urls.regular : ''"
          :alt="photoDetails.alt_description"
          srcset=""
        />
        <div class="overlay">
          <div class="author">
            <p>
              {{ photoDetails.user ? photoDetails.user.name : '' }}
            </p>
            <small>{{
              photoDetails.user && photoDetails.user.location
                ? photoDetails.user.location
                : ''
            }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- modal -->
    <div v-show="modal" class="modal">
      <!-- Modal content -->
      <span class="modal-content">
        <span class="close" @click="closeModal">&times;</span>

        <img
          :src="photoDetails.urls ? photoDetails.urls.regular : ''"
          alt=""
          srcset=""
        />
        <span class="modal-author">
          <div>
            <p>
              {{ photoDetails.user ? photoDetails.user.name : '' }}
            </p>
            <small>{{
              photoDetails.user && photoDetails.user.location
                ? photoDetails.user.location
                : ''
            }}</small>
          </div>
          <a href="" @click.prevent="download(photoDetails)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <title>Arrow Down</title>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="48"
                d="M112 268l144 144 144-144M256 392V100"
              />
            </svg>
          </a>
        </span>
      </span>
    </div>
    <!-- end of modal -->
  </div>
</template>

<script>
// import JsFileDownloader from 'js-file-downloader'
export default {
  name: 'PhotoCardComponent',
  props: {
    photoDetails: Object,
  },
  data() {
    return {
      modal: false,
    }
  },
  methods: {
    openModal() {
      this.modal = true
    },

    closeModal() {
      this.modal = false
    },

    // download(link) {
    //   const fileUrl = `${link.links.download}`
    //   new JsFileDownloader({
    //     url: fileUrl,
    //   })
    //     .then(() => {
    //       // Called when download ended
    //       console.log('Downloaded')
    //     })
    //     .catch((error) => {
    //       console.log('na error be this', error)
    //     })
    // },
  },
}
</script>

<style lang="scss" scoped>
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 768px) {
  .photo-container {
    display: inline-table;
    overflow: hidden;
    position: relative;
    color: #fff;
    cursor: zoom-in;

    img {
      max-width: 100%;
      height: auto;
    }
    .overlay {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 7.8571em;
      padding: 2.5em;
      background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0.9)),
        to(transparent)
      );
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        transparent 100%
      );

      .author {
        text-transform: capitalize;
        p {
          font-size: 1.5em;
          cursor: pointer;
        }

        small {
          font-size: 0.9em;
          cursor: pointer;
        }
      }
    }
  }

  .modal {
    padding: 2% 1em;

    .modal-content {
      img {
        height: auto;
        width: 85vw;
        // object-fit: contain;
        display: block;
        border-radius: 1em 1em 0 0;
      }

      /* The Close Button */
      .close {
        position: absolute;
        right: -1em;
        top: -1em;
        color: white;
        font-size: 2em;
        font-weight: bold;
      }
    }
  }
}

/* Medium devices and desktops (landscape tablets, 768px and up) */
@media only screen and (min-width: 769px) {
  .photo-container {
    position: relative;
    background: #fff;
    border-radius: 1em;
    overflow: hidden;
    display: inline-table;
    cursor: zoom-in;
    img {
      width: 100%;
    }

    .overlay {
      position: absolute;
      background: white;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2.5em;

      background: -webkit-gradient(
        linear,
        left bottom,
        left top,
        from(rgba(0, 0, 0, 0.9)),
        to(transparent)
      );
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.9) 0%,
        transparent 100%
      );

      .author {
        text-transform: capitalize;
        color: #fff;
        p {
          font-size: 1.5em;
          cursor: pointer;
        }

        small {
          font-size: 0.9em;
          cursor: pointer;
        }
      }
    }
  }

  .modal {
    padding-top: 2%;

    .modal-content {
      img {
        height: 65vh;
        object-fit: contain;
        background: red;
        display: block;
        border-radius: 1em 1em 0 0;
      }

      /* The Close Button */
      .close {
        position: absolute;
        right: -2em;
        top: -1em;
        color: white;
        font-size: 2em;
        font-weight: bold;
      }

      .modal-author {
        background: #fff;
      }
    }
  }
}

// modal
/* The Modal (background) */
.modal {
  display: flex;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  /* Modal Content */
  .modal-content {
    position: relative;
    background-color: #fff;
    margin: auto;
    padding: 0;
    border-radius: 1em;
    max-width: 1536px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;

    /* The Close Button */
    .close {
      position: absolute;
      right: -1em;
      top: -1em;
      color: white;
      font-size: 2em;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }

    .modal-author {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-radius: 0 0 1em 1em;
      text-transform: capitalize;
      padding: 3em;
      p {
        font-size: 1.5em;
        cursor: pointer;
        padding-bottom: 0.5em;
      }

      small {
        font-size: 0.9em;
        color: rgb(85, 81, 81);
        cursor: pointer;
      }

      a {
        background: hsla(0, 0%, 100%, 0.9);
        padding: 0.5em 0.7em;
        border-radius: 0.3em;
        border: 1px solid green;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        &:hover {
          cursor: pointer;
        }
        svg {
          height: 1.5em;
          color: #767676;
          &:hover {
            color: green;
          }
        }
      }
    }
  }
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}
</style>
