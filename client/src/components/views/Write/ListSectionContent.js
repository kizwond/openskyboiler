import React, { Component } from 'react';
import './LikeSectionContent.css'
import { EyeInvisibleOutlined, StarTwoTone, StarOutlined, EyeOutlined, ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';
import CategorySettingModal from './CategorySettingModal'
import CategoryMoveModal from './CategoryMoveModal'
import DeleteBook from './DeleteBookModal'
import ChangeBookTitle from './ChangeBookTitle'


class ListColumns extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     }
  }

  render() { 
    return ( 
      <ul className="like_list_columns">
        <li>카테고리 <CategorySettingModal categoryListOrderHandler={this.props.categoryListOrderHandler} 
                                          categoryDeleteHandler={this.props.categoryDeleteHandler} 
                                          addCategory={this.props.addCategory} 
                                          changeCategoryHandler={this.props.changeCategoryHandler} 
                                          category={this.props.category}/></li>
        <li>책이름</li>
        <li>책이름<br/>변경</li>
        <li>구분</li>
        <li>저자</li>
        <li>총페이지</li>
        <li>최근30일<br/>작성카드</li>
        <li>카드종류</li>
        <li>생성일</li>
        <li>최근작성일</li>
        <li>카테고리<br/>이동</li>
        <li>즐겨찾기</li>
        <li>순서이동</li>
        <li>목록에서<br/>감추기 
            {this.props.hideOrShowClass === false  ? <span onClick={this.props.hideOrShowToggle} className="hide_or_show_title_btn">OFF</span> : 
                                                     <span onClick={this.props.hideOrShowToggle} className="hide_or_show_title_btn">ON</span>}
        </li>
        <li>삭제</li>
      </ul> 
    );
  }
}

class ListContent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      editBookTitle:false,
     }
  }

  editBookTitleHandler = () =>{
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  titleChangeHandleClick = ()=> {
    this.setState(state => ({
      editBookTitle: !state.editBookTitle
    }));
  }
  render() { 
    const info = this.props.bookInfo;
    const date = info.date.slice(0,10)
    const update_date = info.date.slice(0,10)
    const classes = `like_list_contents`
    const renderLike = () => {
      if(info.hide_or_show === 'true'){
          if(info.like === 'true') {
            return <StarTwoTone onClick={()=>this.props.onClickLike({value:'true',bookId:this.props.bookInfo._id})} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>
          }else {
            return <StarOutlined onClick={()=>this.props.onClickLike({value:'false',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>
          } 
        } else{
          return 
        }
      }
    return ( 
      <>
      {info.category === this.props.currentCategory ? 
      
        <div className={classes}>
          <ul>
            <li>{info.category}</li>
            <li>{this.state.editBookTitle ? <ChangeBookTitle bookTitle={info} 
                                                            category={this.props.category} 
                                                            changeBookTitleHandler={this.props.changeBookTitleHandler} 
                                                            onClick={this.titleChangeHandleClick}/> : info.book_title}</li>
            <li><EditOutlined onClick={this.editBookTitleHandler} style={{fontSize:'14px'}}/></li>
            <li>{info.division}</li>
            <li>{info.user_nick}</li>
            <li>{info.total_pages}</li>
            <li>{info.recent_input}</li>
            <li>단면 {info.single_cards}장<br/>양면 {info.dual_cards}장</li>
            <li>{date}</li>
            <li>{update_date}</li>
            <li><CategoryMoveModal category={this.props.category} bookTitle={info} bookCategoryMove={this.props.bookCategoryMove}/></li>
            <li>
              {renderLike()}
            </li>
            <li>{info.hide_or_show === 'true' ? <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'list', bookId: this.props.bookInfo._id})} style={{fontSize:'14px'}}/>
                                              <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'list', bookId: this.props.bookInfo._id})} style={{fontSize:'14px'}}/></> : ''}
            </li>
            <li>{info.hide_or_show === 'true' ? <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:'true',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>:
                                    <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:'false',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>}</li>
            <li><DeleteBook bookTitle={info} bookDeleteHandler={this.props.bookDeleteHandler} /></li>
          </ul>
        </div> 
      
      : ''}
      </>
     );
  }
}
class CategoryListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      category:this.props.categoryName
     };
  }
  render() {
    const bookList = this.props.bookTitle.map((book_title)=>(
      <ListContent category={this.props.category} 
                  currentCategory={this.state.category}
                  key={book_title._id} 
                  bookCategoryMove={this.props.bookCategoryMove} 
                  bookInfo={book_title} 
                  listOrderHandler={this.props.listOrderHandler} 
                  changeBookTitleHandler={this.props.changeBookTitleHandler} 
                  bookDeleteHandler={this.props.bookDeleteHandler} 
                  onClickLike={this.props.onClickLike} 
                  onClickHideOrShow={this.props.onClickHideOrShow}/>
    ))
    return (

      <div className="each_category_container">{bookList}</div>

    );
  }
}

class ListSectionContent extends Component {
  render() { 
    const categoryList = this.props.category.map((category)=>(
      <CategoryListContainer key={category._id} categoryName={category.category_name} category={this.props.category} 
                                                                                      bookCategoryMove={this.props.bookCategoryMove} 
                                                                                      bookTitle={this.props.bookTitle} 
                                                                                      listOrderHandler={this.props.listOrderHandler} 
                                                                                      changeBookTitleHandler={this.props.changeBookTitleHandler} 
                                                                                      bookDeleteHandler={this.props.bookDeleteHandler} 
                                                                                      onClickLike={this.props.onClickLike} 
                                                                                      onClickHideOrShow={this.props.onClickHideOrShow}/>
    ))
    return ( 
      <div className="like_list_container">
        <ListColumns categoryListOrderHandler={this.props.categoryListOrderHandler} 
                    categoryDeleteHandler={this.props.categoryDeleteHandler} 
                    changeCategoryHandler={this.props.changeCategoryHandler} 
                    addCategory={this.props.addCategory} 
                    category={this.props.category} 
                    hideOrShowClass={this.props.hideOrShowClass} 
                    hideOrShowToggle={this.props.hideOrShowToggle} />
        {categoryList}
      </div>
     );
  }
}
 
export default ListSectionContent;