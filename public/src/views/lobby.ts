import { messages } from "../const/messages";

/**
 * This class represents and handle the div elements on the document.
 * It shows the lobby in order to interact with the user when the game is not running
 */
class Lobby {
  //Dom Elements
  private $body: HTMLElement;
  private $div_loading: HTMLElement;
  private $div_waiting_room: HTMLElement;
  private $div_full_room: HTMLElement;
  private $div_error: HTMLElement;
  private $input_waiting_room: HTMLInputElement;
  private $btn_waiting_room: HTMLElement;
  $btn_full_room: HTMLElement;

  constructor() {
    /*get lobby elements from DOM*/
    this.$body = document.body;
    //stages show/hide elements
    this.$div_loading = document.getElementById("loading-div");
    this.$div_waiting_room = document.getElementById("waiting-room-div");
    this.$div_full_room = document.getElementById("full-room-div");
    this.$div_error = document.getElementById("error-div");
    //interact elements
    this.$input_waiting_room = <HTMLInputElement>(
      document.getElementById("waiting-room-input")
    );
    this.$btn_waiting_room = document.getElementById("waiting-room-btn");
    this.$btn_full_room = document.getElementById("full-room-btn");
  }

  displayError(errorMessage: string) {
    this.hideAll();
    this.$div_error.style.display = "block";
    this.$div_error.innerText = errorMessage;
  }

  setLoadingPercentage(percentage: string) {
    if (!this.$div_loading.style.display)
      this.$div_loading.style.display = "block";
    this.$div_loading.innerHTML = messages.loadingAssets + percentage;
  }

  displayWaitingRoom(roomUrl: string) {
    this.hideAll();
    this.$div_waiting_room.style.display = "block";
    this.$input_waiting_room.value = roomUrl;
    //on click, copy to clipboard and show btn style
    this.$btn_waiting_room.addEventListener("click", () => {
      navigator.clipboard.writeText(this.$input_waiting_room.value);
      this.showCopiedBtnStyle();
    });
  }

  displayFullRoom() {
    this.hideAll();
    this.$div_full_room.style.display = "block";
  }

  hideAll() {
    Array.from(this.$body.children).forEach((e: HTMLElement) => {
      //check tag name (to not hide the canvas)
      if (e.tagName === "DIV") e.style.display = "none";
    });
  }

  private showCopiedBtnStyle() {
    this.$btn_waiting_room.innerText = "Copied!";
    this.$btn_waiting_room.classList.add("copied");
    setTimeout(() => {
      this.$btn_waiting_room.innerText = "Copy Room Url";
      this.$btn_waiting_room.classList.remove("copied");
    }, 1500);
  }
}

export const lobby = new Lobby();
