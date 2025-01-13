/* 
when you want to use an image in your typescript project,
you need to create an image type file
*/
declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.jpg" {
  const value: any;
  export default value;
}
declare module "*.jpeg" {
  const value: any;
  export default value;
}
declare module "*.svg" {
  const value: any;
  export default value;
}
