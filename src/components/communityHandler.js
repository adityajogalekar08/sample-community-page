export default function communityPage(props) {
  console.log('inside community Page:', props);
  props.map((users) => console.log(users.user_id));
}

export function userHandler() {
  console.log('user handler');
}
