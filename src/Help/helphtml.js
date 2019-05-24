import React from 'react';

function helphtmltext(props) {
  return (
    <div className='div-contact'>
      <div className="m-2">
          <b>How-To:</b>
          <ul className='ul-how-to'>
            <li>Fork <a href="https://github.com/prakis/stringify.me">Stringify.me</a></li>
            <li>Edit profile.json</li>
            <li>Done. Your profile read at https://stringify.me/YOUR_GITHUB_USERNAME</li>
          </ul>

        <p className='p-contact'>
          You can contact me at kishore@tealpod.com 
          or DM  
          <a href="https://twitter.com/prakis">@prakis</a>
          <br/><br/>
          <a href="https://www.tealpod.com">Tealpod.com</a>
        </p>
      </div>
    </div>
  );
};

export default helphtmltext;