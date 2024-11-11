import AvatarInfo from "./AvatarInfo";
import AvatarPost from "./AvatarPost";
import Content from "./Content";
import InteractiveButton from "./InteractiveButton";

export default function Post() {
    let content = `Lorem ipsum odor amet, consectetuer adipiscing elit. Elit taciti morbi justo suspendisse vivamus. Ante viverra non class conubia lectus senectus ultrices posuere. Proin convallis mus blandit quam et. Fringilla in tellus nisl tempor suspendisse inceptos primis magnis. Turpis lacinia odio posuere quisque nunc. Congue etiam aenean platea, netus purus praesent.

Ut velit ultrices odio sit magna mollis. Porttitor per blandit rhoncus commodo quisque adipiscing. Sit velit lobortis volutpat egestas sagittis at volutpat hac. Porta nullam augue condimentum per et praesent primis metus. Velit magna at; magnis hendrerit vivamus sagittis elit et? In rutrum fermentum maecenas nostra primis imperdiet orci dui. Maximus curabitur nulla massa lacus dui parturient auctor donec. Odio vel litora sagittis risus scelerisque montes vulputate, integer vivamus.

Cras sodales rutrum nisi ante amet justo ut orci. Sem curae nam auctor aenean dictum purus eleifend. Risus a ullamcorper luctus mauris sapien varius. Purus nullam volutpat fermentum donec mattis porta. Eros tellus ligula finibus euismod cursus. Posuere elit imperdiet; blandit vitae scelerisque leo nostra etiam nunc. Ex ipsum sollicitudin scelerisque accumsan sodales. Ultricies conubia purus netus pellentesque lacinia aptent dis. Libero tellus mi bibendum hendrerit, vehicula dui. Tempor consequat risus in mollis lectus inceptos dignissim porttitor augue.

Feugiat consectetur penatibus sodales consequat ad convallis bibendum malesuada. Cubilia ultricies ad nec at quis mollis ad nisl. Cubilia accumsan rhoncus netus urna tempor eu vitae! Faucibus quis sit id mauris elit netus ullamcorper mattis. Nunc in purus mollis felis rutrum. Erat nec conubia feugiat commodo ipsum eros ridiculus tincidunt lobortis.

Aptent iaculis elit faucibus habitant sit ornare turpis nullam ultricies. Tristique lectus vestibulum et diam quisque dis at maximus mauris. Euismod donec a pulvinar mus pretium. Id leo primis ad placerat netus at hac porttitor suscipit. Leo volutpat nisl nisl urna accumsan praesent natoque. Potenti gravida risus arcu; duis pellentesque curae. Dapibus cubilia pulvinar torquent, ultricies volutpat gravida nec integer.`;
    return (
        // Container
        <div className="border rounded-2xl p-2 my-5">
            {/* Avatar and name container */}
            <div className="flex items-center justify-start gap-2">
                <AvatarPost src={"/icons/avatar-man.svg"} alt={"Avatar"} width={30} height={30} />
                <AvatarInfo name={"Quora Knowledge Contests"} datePost={"2 days ago"} />
            </div>

            {/* Main content part */}
            <Content heading={"Lorem ipsum odor amet, consectetuer adipiscing elit."} content={content} imageSrc={"https://picsum.photos/seed/picsum/200"} imageAlt={"Lorem piscum"} imageWidth={1000} imageHeight={100} />

            {/* Interactive buttons part */}
            <div className="flex gap-4">
                <InteractiveButton src={"/icons/upvote-arrow.svg"} alt={"Upvote arrow"} quantity={"20K"} />
                <InteractiveButton src={"/icons/downvote-arrow.svg"} alt={"Downvote arrow"} quantity={"2K"} />
                <InteractiveButton src={"/icons/comment.svg"} alt={"Comment"} quantity={"500"} />
                <InteractiveButton src={"/icons/share.svg"} alt={"Share"} />
            </div>
        </div>
    );
}
