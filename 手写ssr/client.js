import { hydrateRoot } from "react-dom/client";

const { props, page } = window.__DATA__;

const importFile = async (path) => {
	return await import(`./pages/${path}.js`);
};

// 组件代码是动态获取的，只需要写一遍就可以了，不用动态改变
const data = await importFile(page);
const Component = data.default;

hydrateRoot(document.getElementById("root"), <Component {...props} />);
