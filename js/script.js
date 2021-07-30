{
  'use strict';
  /*document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
    });*/
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors';


  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' for all arcitle links */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link*/
    //console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all arcitles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    //console.log('articleSelector', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute)*/
    const targetArticle = document.querySelector(articleSelector);
    //console.log('targetArticle', targetArticle);

    /* add class 'active' to the correst arcitle */
    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    //console.log('optArticleSelector', optArticleSelector);
    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      //console.log('articleId', articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('linkHTML', linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    //console.log('html', html);
    const links = document.querySelectorAll('.titles a');
    //console.log('links', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();


  /*function clearMessages() {
    document.getElementById('messages').innerHTML = '';
  }*/
  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    };
    for(let tag in tags) {
      //console.log(tag + 'is used in ' + tags[tag] + ' times');

      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }

    }
    return params;
  }
  
  calculateTagsParams();

  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const precentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( precentage * ( optCloudClassCount -1) + 1);
    return optCloudClassPrefix + classNumber;


  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    //console.log('allTags:', allTags);

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('arcitles', articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      //console.log ('tagsWrapper', tagsWrapper);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      //console.log('articleTags', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      //console.log('articleTagsArray', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        //console.log('tag', tag);

        /* generate HTML of the link */
        let linkHTMLtag = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        //console.log('linkHTMLtag', linkHTMLtag);

        /* add generated code to html variable */
        html = html + linkHTMLtag;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      //console.log('html', html);

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column*/
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW]  create variable for all links HTML code */
    let allTagsHTML = '';
    const tagParams = calculateTagsParams(allTags);
    //console.log('tagParams:', tagParams);

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags){
      //const tagLinkHTML = calculateTagClass(allTags[tag], tagParams);
      //console.log('tagLinkHTML:', tagLinkHTML);
      /* [NEW] generate code of a link andd add it to allTagsHTML */
      const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagParams) +'" href="#tag-' + tag + '">' + tag + '</a>'  + ' </li> ';
      
      allTagsHTML += tagLinkHTML;
      //console.log('allTagsHTML:', allTagsHTML);
      //console.log('calculateTagClass', calculateTagClass);
    }
    /* [NEW] END LOOP: for each tag in allTags: */
  
    /* [NEW] add HTML for alTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;


  }
  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /*make new constant named "clickedElement" and give it the value of "this"*/
    const clickedElement = this;

    /*make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log(activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

      /* remove class active */
      activeTag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
    //console.log('generateTitleLinks', generateTitleLinks);
  }
  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandles as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }

  }
  addClickListenersToTags();

  /* [END NEW] */
  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
      const authorsWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';
      html = html + linkHTML;
      if(!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      authorsWrapper.innerHTML = html;
    }
    const authorList = document.querySelector(optAuthorsListSelector);
    let allAuthorsHTML = '';
    for (let author in allAuthors){
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] +') ' + '</a></li> ';
    }
    authorList.innerHTML = allAuthorsHTML;

  }
  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  function addClickListenersToAuthors() {
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors();
}

