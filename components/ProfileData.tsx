const ProfileData: React.FC<any> = ({ graphData }) => {
  return <pre>{JSON.stringify(graphData)}</pre>;
};

export default ProfileData;
