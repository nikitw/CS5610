<%@ Page Language="C#" %>

<script runat="server">
    <%-- This demo page has no server side script --%>
</script>

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset='utf-8' />

<title>Nikit Waghela</title>

<style type="text/css">

    ul.master_navigation {
	    background: #efefef;
	    background: linear-gradient(top, #efefef 0%, #bbbbbb 100%);
	    background: -moz-linear-gradient(top, #efefef 0%, #bbbbbb 100%);
	    background: -webkit-linear-gradient(top, #efefef 0%,#bbbbbb 100%);
	    box-shadow: 0px 0px 9px rgba(0,0,0,0.15);
	    padding: 0 20px;
	    border-radius: 5px;
	    list-style: none;
	    position: relative;
	    display: inline-table;
        max-width:960px;
    }
	ul.master_navigation:after {
		content: "";
        clear: both;
        display: block;
	}

    ul.master_navigation li {
	    float: left;
    }
	ul.master_navigation li:hover {
		background: #4b545f;
		background: linear-gradient(top, #4f5964 0%, #5f6975 40%);
		background: -moz-linear-gradient(top, #4f5964 0%, #5f6975 40%);
		background: -webkit-linear-gradient(top, #4f5964 0%,#5f6975 40%);
	}
		ul.master_navigation li:hover a {
			color: #fff;
		}

	ul.master_navigation li a {
		display: block; padding: 15px 10px;
		color: #757575; text-decoration: none;
	}

    ul.master_navigation ul {
	    background: #5f6975; border-radius: 0px; padding: 0;
	    position: absolute; top: 100%;
    }

    ul.master_navigation ul {
        display: none;
    }

	ul.master_navigation ul li {
		float: none;
		border-top: 1px solid #6b727c;
		border-bottom: 1px solid #575f6a;
		position: relative;
        list-style: none;
	}
		ul.master_navigation ul li a {
			padding: 15px 40px;
			color: #fff;
		}
			ul.master_navigation ul li a:hover {
				background: #4b545f;
			}

    ul.master_navigation ul ul {
	    position: absolute; left: 100%; top:0;
    }

    ul.master_navigation li:hover > ul {
		display: block;
	}
    /*ul.master_navigation
    {
        border-radius: 10px;
        font-size: 100%;
        font-weight: bold;
        text-align: center;
        list-style: none;
        margin: 0px;
        padding: 0;
    }

    ul.master_navigation li
    {
        display: inline-block;
        padding: 0 0.5%;
    }
    */
    a
    {
        color: #08f;
        text-decoration: none;
    }

    .bold {
        font-weight:bold;
    }

    a:visited
    {
        color: #88f;
    }

    a:hover
    {
        color: #f00;
    }

    p
    {
        text-align: justify;
    }

    .expbar ul {
        max-width:960px;
        box-shadow: none;
    }

</style>

<style type="text/css" media="screen">
    .container {
        max-width: 100%;
        padding: 0;
        margin-left: auto;
        margin-right: auto;

        font-family: Helvetica, sans-serif;
        font-size: 18px;
        line-height: 24px;
        color: black;

    }

    body {
        margin:0px;
        padding:0;
    }
    .pad {
        padding: 0px;
    }

    .navbar {

        margin: auto;
    }

    .zindex3, .zindex3 ul, .zindex3 ul li, .zindex3 ul li a {
        z-index:3;
    }

    .zindex4, .zindex4 ul, .zindex4 ul li, .zindex4 ul li a {
        z-index:4;
    }

    html {
        background:url(http://icam1990.com/wp-content/uploads/2014/11/Boston_Skyline_as_Seen_From_Cambridge.jpg) no-repeat center center fixed;

        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;

    }

    .right {
        float:right;
    }
    .translucent {
        background-color:white;
        opacity:0.8;
        border-radius: 5px;
        padding:10px 30px;
    }

    .footer {
        color:beige;
    }

    .profile {
        position: relative;
	    display: inline-table;
    }

    .maxscreen, .screen720, .screen600, .screen400, .screen300 {
        display: none;
    }


    @media screen and (max-width: 500px) {
        .empty {
           border:0px;
           height:0px;
           margin:0px;
        }
    }

    @media screen and (min-width:500px) and (max-width:724px){
        .empty {
            border-left: 0px;
            margin: 0 50px;
            height: 0px;
        }
    }

    @media screen and (min-width:725px) {
        .profile div {
            float:left;
        }
        .empty {
            border-left: 2px solid gray;
            margin: 0 50px;
            height: 225px;
        }
    }

    @media screen and (min-width:990px) {
        .container {
            width:960px;
        }

        .maxscreen {
            display:block;
        }

        .profile_image {
            height:225px;
            width: 320px;
        }

        ul.master_navigation li a {
		    padding: 15px 12px;
	    }

    }

    @media screen and (min-width:725px) and (max-width:989px) {
        .container {
            width:720px;
        }

        .screen720 {
            display:block;
        }

        .profile_image {
            height:225px;
            width: 320px;
        }

        ul.master_navigation ul {
	        position: absolute; left: 70%; right:0; top:100%;
        }

        ul.master_navigation li a {
		    padding: 15px 12px;
	    }
    }

    @media screen and (min-width:602px) and (max-width:724px) {
        .container {
            width:600px;
        }

        .screen600 {
            display:block;
        }

        .profile_image {
            height:225px;
            width: 320px;
        }

        ul.master_navigation ul {
	        position: absolute; left:70%; right:0; top:100%;
        }
    }

    @media screen and (min-width:411px) and (max-width:601px) {

        .container {
            width:400px;
        }

        .screen400 {
            display:block;
        }

        .profile_image {
            height:160px;
            width: 250px;
        }

        ul.master_navigation ul {
	        position: absolute; left: 50%; right:0; top:100%;
        }
    }

    @media screen and (max-width:410px) {
        .container {
            width:300px;
        }

        .screen300 {
            display:block;
        }

        .navbar ul {
            width:250px;
        }

        .profile_image {
            height:145px;
            width: 230px;
        }

        ul.master_navigation ul ul {
	        position: absolute; left: 0; top:100%;
        }

        .expbar ul{
            width: 190px;
        }
    }

    .smalltext {
        font-size:small;
    }

    .thumbnail {
        border-radius:4px;
        width:100%;
        height:100%;
    }

    .desc {

    }

    p.emailid {
        color: blue;
        font-style:italic;
    }

    p.name {
        font-weight:bolder;
    }

    p.nuid {
        font-weight:bold;
    }
</style>

</head>

<body>
    <div class="bg_float">
    </div>
<div class="container">
<div class="pad">

<form id="form1" runat="server">

<div>
    <div class="navbar">
        <div class="maxscreen">
            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="search/" target="_blank">Search</a></li>
                <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li><a href="textview/" target="_blank">TextView</a></li>
                <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                <li><a href="blog/" target="_blank">Blog</a></li>

            </ul>
        </div>

        <div class="screen720 zindex4">
            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="search/" target="_blank">Search</a></li>
                <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li><a href="textview/" target="_blank">TextView</a></li>
                <li><a href="#">more</a>
                    <ul>
                        <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                        <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                        <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                        <li><a href="blog/" target="_blank">Blog</a></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="screen600 zindex4">
            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="search/" target="_blank">Search</a></li>
                <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li><a href="#">more</a>
                    <ul>
                        <li><a href="textview/" target="_blank">TextView</a></li>
                        <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                        <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                        <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                        <li><a href="blog/" target="_blank">Blog</a></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="screen400 zindex4">
            <ul class="master_navigation">
                <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li><a href="statistics/" target="_blank">Statistics</a></li>
                <li><a href="source/" target="_blank">Source</a></li>
                <li><a href="#">more</a>
                    <ul>
                        <li><a href="search/" target="_blank">Search</a></li>
                        <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                        <li><a href="textview/" target="_blank">TextView</a></li>
                        <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                        <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                        <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                        <li><a href="blog/" target="_blank">Blog</a></li>
                    </ul>
                </li>
            </ul>
        </div>

        <div class="screen300 zindex4">
            <ul class="master_navigation">
                <li><a href="#"> Navigation menu </a>
                    <ul>
                        <li><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                        <li><a href="statistics/" target="_blank">Statistics</a></li>
                        <li><a href="source/" target="_blank">Source</a></li>
                        <li><a href="search/" target="_blank">Search</a></li>
                        <li><a href="searchtree/" target="_blank">SearchTree</a></li>
                        <li><a href="textview/" target="_blank">TextView</a></li>
                        <li><a href="filelist.aspx" target="_blank">FileList</a></li>
                        <li><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                        <li><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                        <li><a href="blog/" target="_blank">Blog</a></li>
                    </ul>
                <li>
            </ul>
        </div>
    </div>

    <div class="translucent profile">
        <div class="profile_image">
            <img alt="Nikit" class="thumbnail" src="images/profile/nikit_waghela.jpg" />
        </div>
        <div class="empty">&nbsp</div>
        <div class="desc">
            <p class="name">Nikit Waghela</p>
            <br />
            <p class="emailid"> <a href="mailto:nwaghela@ccs.neu.edu">nwaghela@ccs.neu.edu</a></p>
            <p class="emailid"><a href="mailto:waghelanikit@gmail.com">waghelanikit@gmail.com</a></p>
        </div>
    </div>

    <br />

    <div class="expbar zindex3">
        <ul class="master_navigation">
            <li><a href="exps/index.htm" target="_blank">Experiments</a></li>
            <li><a href="http://tripplanner-cs6240nwaghela.rhcloud.com" target="_blank">Project</a></li>
            <li><a href="https://github.com/waghelanikit/TripPlanner" target="_blank">Project GIT</a></li>
            <li><a href="https://github.com/waghelanikit/CS5610" target="_blank">GitHub</a></li>
        </ul>
    </div>
<div class="translucent">
    <H1>
        Responsive
    </H1>
    <hr />
    <p>
        And yes, this site is responsive. Please resize your browser window to see it's effects. Navigation becomes exciting as the size changes.
    </p>
    <H1>
        AngularJS
    </H1>
    <hr />
    <p>
        New AngularJS webapps are interesting and quick.
    </p>
    <H1>
        NodeJS
    </H1>
    <hr />
    <p>
        Server side application bolstered by Node, one of the most powerful tool for developing quick and sophisticated webapps.
    </p>
    <H1>
        NoSQL (MongoDb using Mongoose JS)
    </H1>
    <hr />
    <p>
        SQL is powerful, but NoSQL is a powerhouse in itself. The flexibility offered by NoSQL is commendable. Complex logic becomes less tricky with Mongoose.
    </p>
    <H1>
        Project: TripPlanner
    </H1>
    <hr />
    <p>
        An application that helps manage trips for users with a simplistic UI and handy features. Users will be able to share trips with others on request or voluntarily. Have a look at the beta version by cliking on project TAB.
    </p>

</div>
</div>

</form>

</div>
</div>
<div class="footer container smalltext">
        <p>
            Designed by Nikit Waghela <a href="mailto:waghelanikit@gmail.com">waghelanikit@gmail.com</a>
        </p>
</div>
</body>
</html>
