import moment from "moment";

export const downloadFile = async myData => {
  const fileName = `${moment().format(
    "MMM_DD_YYYY_hh_mm_A"
  )}_boring_dashboard_backup`;
  const json = JSON.stringify(myData);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export function onFileSelected(event) {
  return new Promise(resolve => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = resolve;
  });
}
