
import './styles.css';
import { useEffect, useState, useCallback} from 'react'
import{loadPosts} from '../../Utils/load-post'
import {Post} from '../../Components/Posts'
import { Button } from '../../Components/Button';
import { TextInput } from '../../Components/TextImput';

export const Home = () => {
  const [posts,setPosts] = useState([]);
  const [allposts,setAllPosts] = useState([]);
  const [page,setPage] = useState(0);
  const [postPerPage] = useState(12);
  const [searchValue,setSearchValue] = useState('');

  const noMorePosts = page+ postPerPage>= allposts.length;

  const filteredPosts = !!searchValue ? 
    posts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    : posts;



  const handleloadPosts =useCallback(async (page, postPerPage) => {
    const postsAndPhotos = await loadPosts()

    setPosts(postsAndPhotos.slice(page, postPerPage))
    setAllPosts(postsAndPhotos)
  },[])

  useEffect(() =>{
    handleloadPosts(0, postPerPage);
  },[handleloadPosts,postPerPage]);

  const loadMorePosts = () =>{
    const nextPage = page+ postPerPage;
    const nextPosts = allposts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);


    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) =>{
    const {value} = e.target;
    setSearchValue(value);
  }

  return (
    <section className = "container">
      <div className = "search-container">
        {!!searchValue && (
        <h1>Search value:{searchValue}</h1>
      )}
      
      <TextInput searchValue={searchValue} handleChange={handleChange}/>
      <br/><br/><br/>
      
      
      </div>  


      {filteredPosts.length > 0 &&(
        <Post posts = {filteredPosts}/>
      )}

      {filteredPosts.length === 0 &&(
        <p>Não existem posts :( </p>
      )}
      

      <div className = "button-container">
        {!searchValue && (
          <Button
          text ='load more posts'
          onClick={loadMorePosts}
          disabled = {noMorePosts}
          />
        )}
        
      </div>
    </section>
  ); 
}


/* export class Home2 extends Component {
  state = {
    posts: [],
    allposts: [],
    page:0,
    postPerPage: 10,
    searchValue: '',
  };

 async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postPerPage} = this.state
    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postPerPage),
      allposts: postsAndPhotos,
    });
  }

  loadMorePosts = () =>{
    const{
      page,
      postPerPage,
      allposts,
      posts 
    } = this.state;

    const nextPage = page+ postPerPage;
    const nextPosts = allposts.slice(nextPage, nextPage + postPerPage);

    posts.push(...nextPosts);

    this.setState({posts,page:nextPage});
  }

  handleChange = (e) =>{
    const {value} = e.target;
    this.setState({searchValue:value});
  }

  render() {
    const {posts, page, postPerPage, allposts,searchValue} = this.state;
    const noMorePosts = page+ postPerPage>= allposts.length;

    const filteredPosts = !!searchValue ? 
    allposts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    :
     posts;

  return (
    <section className = "container">
      <div class = "search-container">
        {!!searchValue && (
        <h1>Search value:{searchValue}</h1>
      )}
      
      <TextInput searchValue={searchValue} handleChange={this.handleChange}/>
      <br/><br/><br/>
      
      
      </div>  


      {filteredPosts.length > 0 &&(
        <Post posts = {filteredPosts}/>
      )}

      {filteredPosts.length === 0 &&(
        <p>Não existem posts :( </p>
      )}
      

      <div className = "button-container">
        {!searchValue && (
          <Button
          text ='load more posts'
          onClick={this.loadMorePosts}
          disabled = {noMorePosts}
          />
        )}
        
      </div>
    </section>
  );
  }
} */

