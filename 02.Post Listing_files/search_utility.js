//-- function moveToTop to enable Top Navigation -->
function moveToTop()
{
    window.scrollTo(0,0);	
}

//-- function searchOnEnter to enable Enter button for Search -->
function searchOnEnter(formId,e)
{
	if(e.keyCode == 13)
	{
		$(formId).submit();
	}
}
