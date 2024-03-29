"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, produtos, opcoesDeTipo, produtosPDF } from "./data.js";
import { capitalize } from "./utils";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import TooltipComponent from "../Tooltip";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import ButtonComponent from "../ButtonComponent";

const INITIAL_VISIBLE_COLUMNS = ["name", "tipoDeProduto", "actions"];

export default function TableOfProducts() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [tipoDeProdutoFilter, setTipoDeProdutoFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let produtosFiltrados = [...produtos];

    if (hasSearchFilter) {
      produtosFiltrados = produtosFiltrados.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      tipoDeProdutoFilter !== "all" &&
      Array.from(tipoDeProdutoFilter).length !== opcoesDeTipo.length
    ) {
      produtosFiltrados = produtosFiltrados.filter((product) =>
        Array.from(tipoDeProdutoFilter).includes(product.tipoDeProduto)
      );
    }

    return produtosFiltrados;
  }, [produtos, filterValue, tipoDeProdutoFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");
  const [idToDelete, setIdToDelete] = React.useState("");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleConfirmModal = (productId) => {
    const id = productId;
    const produtos = JSON.parse(localStorage.getItem("produtos"));
    const deletarProduto = produtos.filter((produto) => produto.id !== id);
    localStorage.setItem("produtos", JSON.stringify(deletarProduto));
    window.location.reload();
  };

  const handleCancelModal = () => {
    toast.warning("Produto não deletado!");
  };

  const handleClickDelete = (productId) => {
    setIdToDelete(productId);
    handleOpen("blur");
  };

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: product.avatar }}
            description={product.email}
            name={cellValue}
          >
            {product.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">{product.team}</p>
          </div>
        );
      case "tipoDeProduto":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem href={`/visualizar-produto/${product.id}`}>Visualizar</DropdownItem>
                <DropdownItem href={`/editar-produto/${product.id}`}>Editar</DropdownItem>
                <DropdownItem onClick={() => handleClickDelete(product.id)}>Deletar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const options = {
    // default is `save`
    method: "save",

    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "portrait",
    },
  };

  const getTargetElement = () => {
    const targetElement = document.createElement("div");
    produtosPDF.forEach((produto) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div>
          <h1>${produto.name}</h1>
          <p>${produto.id}</p>
          <p><strong>Estoque:</strong> ${produto.estoque} unidades</p>
        </div>
      `;
      targetElement.appendChild(div);
    });
    return targetElement;
  };

  const handleGeneratePDF = async () => {
    const targetElement = getTargetElement();
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const iframeWindow = iframe.contentWindow;
    const iframeDocument = iframeWindow.document;
    iframeDocument.open();
    iframeDocument.write(targetElement.innerHTML);
    iframeDocument.close();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    iframeWindow.print();
    document.body.removeChild(iframe);
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Procurar pelo nome..."
            startContent={<SearchIcon />}
            tatus
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Tipo de Produto
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={tipoDeProdutoFilter}
                selectionMode="multiple"
                onSelectionChange={setTipoDeProdutoFilter}
              >
                {opcoesDeTipo.map((tipo) => (
                  <DropdownItem key={tipo.uid} className="capitalize">
                    {capitalize(tipo.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Link href={"/criar-produto"}>
              <Button color="primary" endContent={<PlusIcon />}>
                Adicionar Novo Produto
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {produtos.length} produtos</span>
          <label className="flex items-center text-default-400 text-small">
            Produtos por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    tipoDeProdutoFilter,
    visibleColumns,
    onRowsPerPageChange,
    produtos.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos os produtos selecionados"
            : `${selectedKeys.size} de ${filteredItems.length} produtos selecionados`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Anterior
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Próximo
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <div>
      <TooltipComponent
        subText={"Clique para carregar produto"}
        position={"right"}
        text={"Atualizar Lista de Produtos"}
        onClick={() => window.location.reload()}
      />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"Produto não encontrado"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Realmente deseja deletar o produto selecionado?
              </ModalHeader>
              <ModalFooter>
                <Button
                  onClick={() => handleCancelModal(idToDelete)}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => handleConfirmModal(idToDelete)}
                  color="primary"
                  onPress={onClose}
                >
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {produtosPDF.length > 0 && (
        <TooltipComponent
          text={"Gerar relatório"}
          subText={"Clique para gerar relatório"}
          position={"bottom"}
          onClick={() => generatePDF(handleGeneratePDF(), options)}
        />
      )}
      <Toaster position="top-center" />
    </div>
  );
}
