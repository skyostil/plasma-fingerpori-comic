/*
*   Copyright (C) 2008
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Library General Public License as
*   published by the Free Software Foundation; either version 2, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details
*
*   You should have received a copy of the GNU Library General Public
*   License along with this program; if not, write to the
*   Free Software Foundation, Inc.,
*   51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

function init()
{
    comic.comicAuthor = "Pertti Jarla";
    if (comic.identifier == new String) {
        comic.requestPage("http://www.hs.fi/fingerpori/", comic.User);
    }
    else {
        comic.websiteUrl = "http://www.hs.fi/fingerpori/car-" + comic.identifier + ".html";
        comic.requestPage(comic.websiteUrl, comic.Page);
    }
}

function pageRetrieved(id, data)
{
    if (id == comic.User) {
        // get last id
        re = new RegExp("/fingerpori/car-(\\d+)");
        match = re.exec(data);
        if (match != null) {
            comic.requestPage("http://www.hs.fi/fingerpori/car-" + match[1] + ".html", comic.Page);
        }
    }
    if (id == comic.Page) {
        var re = new RegExp("hs.mediadelivery.io/img/1920/(.+)\\.jpg");
        var match = re.exec(data);
        var url;
        if (match != null) {
            url = "http://hs.mediadelivery.io/img/1920/" + match[1] + ".jpg";
            var reb = new RegExp("car-(\\d+)");
            var matchb = reb.exec(data);
            if (match != null) {
                comic.identifier = matchb[1];
            }
        } else {
            re = new RegExp("hs.mediadelivery.io/img/1920/(.+)\\.png");
            match = re.exec(data);
            if (match != null) {
                url = "http://hs.mediadelivery.io/img/1920/" + match[1] + ".png";
                var reb = new RegExp("car-(\\d+)");
                var matchb = reb.exec(data);
                if (match != null) {
                    comic.identifier = matchb[1];
                }
            }
            else {
                comic.error();
                return;
            }
        }
        
        // get previous id
        re = new RegExp("article-navlink prev \" href=\"/fingerpori/car-(\\d+)");
        match = re.exec(data);
        if (match != null) {
            comic.previousIdentifier = match[1];
        }

        // get next id
        re = new RegExp("article-navlink next \" href=\"/fingerpori/car-(\\d+)");
        match = re.exec(data);
        if (match != null) {
            comic.nextIdentifier = match[1];
        }
        
        // get next id
        re = new RegExp("article-navlink first \" href=\"/fingerpori/car-(\\d+)");
        match = re.exec(data);
        if (match != null) {
            comic.firstIdentifier = match[1];
        }


        comic.requestPage(url, comic.Image);
    }
}
