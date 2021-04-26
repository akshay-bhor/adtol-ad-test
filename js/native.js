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
    "2f221b0b2c2d033b0bb428da68c332dd17d4b0aae30b464a1be0f08018a3f7af64c1322431049ed18929c66ad3782a3d7737809ba46767fbc7c97d2d0e94849179af60de29b4f94e6925a11bcb41764816b312c6cd4e3d057f9131e51dfe1d9512927485cef94e35e6191cc7f0c416a7ebd994f8004b06ca0ae386-58431a3618b268b8-b66f42b2dca4b2261a532b266580578e673775a7ebeb16d35ce5c5f2ef1f73fb";

  // Create element
  let childEle = document.createElement("div");
  childEle.setAttribute("id", idName);
  childEle.style.display = "inline-block";
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
          background: #fff;
          width: 300px;
          height: 250px;
          border-radius: 2px;
          padding: 0;
          box-sizing: border-box;
          margin: 0.5rem;
          overflow: hidden;
          box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
        "
      >
        <div style="display:block;background:#ccc;width:300px;height:150px">
          <a
            target="_blank"
            style="display:flex;width:300px;height:150px;justify-content:center"
            ${rel}
            href="${res[i].process}"
            ><img
              style="height:100%;width:100%"
              src="${res[i].banner}"
              alt="${res[i].title}"
          /></a>
        </div>
        <div
          style="
            padding: 0.25rem 0.5rem;
            height: 55px;
            font-weight: 600;
            box-sizing: border-box;
            overflow: hidden;
          "
        >
          <a
            target="_blank"
            style="font-size:16px;display:inline-block;text-decoration:none;overflow:hidden;text-overflow:ellipsis;line-height:24px"
            href="${res[i].process}"
            >${res[i].title}</a
          >
        </div>
        <div style="display:flex;justify-content:space-between;align-items:baseline;padding:0.25rem 0.5rem;height:45px">
          <div
            style="
              display:inline-block;
              font-size: 16px;
              color: #A0A0A0;
              max-width: 180px;
              overflow: hidden;
              font-weight:600;
            "
          >
          ${res[i].domain}
          </div>
          <div style="display:inline-block;">
            <a
              target="_blank"
              style="display:inline-block"
              ${rel}
              href="${res[i].process}"
              ><button
                style="
                  background: #4d4dff;
                  border:none;
                  color:#fff;
                  font-weight:600;
                  border-radius: 4px;
                  padding: 8px 16px;
                  cursor:pointer;
                  box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
                "
              >
              ${res[i].btn}
              </button></a
            >
          </div>
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
