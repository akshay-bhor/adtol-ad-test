import fetchAd from "./fetch";
import { randomId, isHidden } from "./util";

// create a random class
const idName = randomId(6);

// Get parent
const currScript = document.currentScript;
const parent = currScript.parentNode;

// Check if parent is hidden
if (!isHidden(parent)) {
  // Get token
  const token =
    currScript.getAttribute("id") ||
    "2f221b0b2c2d033b0bb428da68c332dd17d4b0aae30b464a1be0f08018a3f7af64c1322431049ed18929c66ad3782a3d7737809ba46767fbc7c97d2d0e94849179af60de29b4f94e6925a11bcb41764816b312c6cd4e3d057f9131e51dfe1d9712927485cef94e35e6191cc7f0c416a7ebd9ffbc-58431a3618b268b8-bbe619daf68fdab8f2f5d6b8af78aaf37414494f03c82af385aaf416ef3442cd";

  // Create element
  let childEle = document.createElement("div");
  childEle.setAttribute("id", idName);
  parent.appendChild(childEle);

  // Get ad element
  const ad_widget = document.getElementById(idName);

  // Fetch API
  fetchAd(token)
    .then((res) => {
      res = res.ads;
      let html = "";

      for (let i in res) {
        let rel = "";
        if (res[i].rel == 0) rel = " rel='nofollow'";
        if (res[i].rel == 2) rel = " rel='nofollow noreferrer noopener'";

        html += `
        <div
        style="
          background-color: #fff;
          border-radius: 2px;
          margin: 0.5rem;
          padding: 0.5rem;
          box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        "
      >
        <div>
          <a
            target="_blank"
            style="
              margin: 2px;
              padding: 2px;
              text-align: left !important;
              text-decoration: none;
            "
            ${rel}
            href="${res[i].process}"
          >
            <b>${res[i].title}</b></a
          >
        </div>
        <div style="color: #333; text-align: left !important">
          <a
            target="_blank"
            style="
              margin: 2px;
              padding: 2px;
              text-align: left !important;
              display: inline-block;
            "
            href="https://www.adtol.com"
          >
            <span
              style="
                background: green;
                display: inline-block;
                padding: 0 2px 0 2px;
                border-radius: 4px;
                color: #fff;
                font-size: 14px;
              "
              >Ad</span
            >
          </a>
          ${res[i].domain}
        </div>
        <div
          style="
            margin: 0px;
            padding: 2px;
            color: #777;
            text-align: left !important;
          "
        >
          ${res[i].desc}
        </div>
      </div>
        `;
      }

      ad_widget.innerHTML = html;
    })
    .catch((err) => {
      console.log(err);
    });
}
