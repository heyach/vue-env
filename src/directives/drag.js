import Vue from "vue";

Vue.directive("drag", {
    bind: function(el) {
        el.onmousedown = (e) => {
            let elmParentBound = el.parentNode.getBoundingClientRect();
            let elmBound = el.getBoundingClientRect();
            let disX = e.clientX - el.offsetLeft;
            let disY = e.clientY - el.offsetTop;

            document.onmousemove = (e) => {
                let left = e.clientX - disX;
                let top = e.clientY - disY;

                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left + elmBound.width > elmParentBound.width) {
                    left = elmParentBound.width - elmBound.width;
                }
                if (top + elmBound.height > elmParentBound.height) {
                    top = elmParentBound.height - elmBound.height;
                }

                el.style.left = left + "px";
                el.style.top = top + "px";
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
});
