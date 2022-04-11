import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from 'react-flow-renderer';

import Sidebar from '../components/sidebar';
import UpdateNode from '../components/nodeContent';
import CustomNode from '../components/customNode';
// 示例效果
// import { nodes as initialNodes, edges as initialEdges } from './data'

import './index.less';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '开始', nodeBg: '#ffffff', isHidden: false, id: '1' },
    style: { backgroundColor: '#ffffff' },
    className: 'nodeStyle',
    position: { x: 200, y: 60 },
  },
];

let id = 2;
const getId = (add = false) => {
  if (add) {
    id += 1;
    return `${id - 1}`;
  }
  return `${id}`;
};

const SmoothTransition = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeInfo, setNodeInfo] = useState<any>({});
  // const [edgeInfo, setEdgeInfo] = useState<any>({})

  // 添加连接线
  const onConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        console.log(params, eds);
        // params.animated = true
        params.style = { stroke: '#f6ab6c' };
        return addEdge(params, eds);
      }),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // 删除节点
  const onChange = (val: any) => {
    // console.log(val)
    setNodes((nds) => nds.filter((item) => item.id !== val.id));
  };

  // 拖拽节点添加
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: any = {
        id: getId(),
        type,
        position,
        data: { label: '', nodeBg: '#ffffff', isHidden: false, id: getId(true) },
      };
      if (type === 'custom') {
        newNode.data.onChange = onChange;
        newNode.dragHandle = '.nodelabel';
      }

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  // 点击节点
  const onNodeClick = (e: any, node: any) => {
    // console.log(e, node)
    setNodeInfo(node.data);
  };

  // 点击节点连接线
  const onEdgeClick = (e: any, edge: any) => {
    console.log(edge);
  };

  // 改变节点内容
  const changeNode = (val: any) => {
    setNodes((nds) =>
      nds.map((item) => {
        if (item.id === val.id) {
          item.data = val;
          item.hidden = val.isHidden;
          item.style = { backgroundColor: val.nodeBg };
        }
        return item;
      }),
    );
    // console.log(val, nodes)
  };

  const { setViewport } = useReactFlow();
  setViewport({ x: 0, y: 0, zoom: 2 });

  return (
    <>
      <Sidebar />
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          defaultPosition={[0, 0]}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <UpdateNode info={nodeInfo} onChange={changeNode} />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </>
  );
};

const AddFlow: React.FC = () => {
  return (
    <div className="dndflow">
      <ReactFlowProvider>
        {/* <Sidebar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            defaultPosition={[0, 0]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onEdgeClick={onEdgeClick}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <UpdateNode info={nodeInfo} onChange={changeNode} />
            <Controls />
            <Background />
          </ReactFlow>
        </div> */}
        <SmoothTransition />
      </ReactFlowProvider>
    </div>
  );
};

export default AddFlow;
