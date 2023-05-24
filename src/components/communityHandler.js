export default function communityPage(props) {
  console.log('inside community Page:', props);
  props.map((users) => console.log(users._id.$oid));
}
